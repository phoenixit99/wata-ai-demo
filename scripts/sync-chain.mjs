#!/usr/bin/env node
// Làm mới docs/changes/<n>-<slug>/{intent,spec,plan}.md từ issue GitHub (#17).
// Dùng: npm run chain:sync              → mọi issue đang mở + mọi issue đã có thư mục
//       npm run chain:sync -- 4 10      → chỉ các issue đó
// Chỉ ĐỌC GitHub (gh issue view, gh issue list, gh pr list); chỉ ghi file trong docs/changes/.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readStatus, readTitle, renderChain, renderIndex, selectTargets, slugFor } from './chain/lib.mjs';

const KINDS = ['intent', 'spec', 'plan'];
const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultRun = (args) => execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

class GhError extends Error {}

/** Ghi file chỉ khi nội dung đổi, để chạy lại không sinh diff và không đổi mtime. */
function writeIfChanged(file, content) {
  if (existsSync(file) && readFileSync(file, 'utf8') === content) return false;
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
  return true;
}

export function main({ argv, root = defaultRoot, run = defaultRun, log = console.log, error = console.error }) {
  const bad = argv.filter((a) => !/^[1-9][0-9]*$/.test(a));
  if (bad.length) {
    error(`Tham số không hợp lệ: ${bad.join(', ')}. Dùng: npm run chain:sync [-- <số issue> ...]`);
    return 2;
  }

  const gh = (args) => {
    try {
      return JSON.parse(run(args));
    } catch (e) {
      throw new GhError(`Lệnh lỗi: gh ${args.join(' ')} — ${String(e.message ?? e).split('\n')[0]}`);
    }
  };

  const changesDir = path.join(root, 'docs/changes');
  const folders = existsSync(changesDir)
    ? readdirSync(changesDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && /^\d+-/.test(d.name))
        .map((d) => d.name)
    : [];

  // Đọc hết rồi mới ghi: gh lỗi giữa chừng thì không file nào bị ghi dở.
  let rendered;
  try {
    const open = argv.length
      ? []
      : gh(['issue', 'list', '--state', 'open', '--limit', '500', '--json', 'number']).map((i) => i.number);
    const targets = selectTargets(argv, open, folders.map((f) => parseInt(f, 10)));
    const prs = gh(['pr', 'list', '--state', 'all', '--limit', '500', '--json', 'number,body']);
    rendered = targets.map((n) => {
      const issue = gh(['issue', 'view', String(n), '--json', 'number,title,labels,body,comments']);
      const refs = prs
        .filter((p) => new RegExp(`Refs #${n}(?!\\d)`).test(p.body ?? ''))
        .map((p) => p.number)
        .sort((a, b) => a - b);
      return { folder: slugFor(n, issue.title, folders), files: renderChain(issue, { prs: refs }) };
    });
  } catch (e) {
    if (e instanceof GhError) {
      error(e.message);
      error('Không ghi file nào. Kiểm tra `gh auth status` rồi chạy lại.');
      return 1;
    }
    throw e;
  }

  let changed = 0;
  let kept = 0;
  for (const { folder, files } of rendered) {
    for (const kind of KINDS) {
      if (writeIfChanged(path.join(changesDir, folder, `${kind}.md`), files[kind])) changed++;
      else kept++;
    }
  }

  const entries = readdirSync(changesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d+-/.test(d.name) && existsSync(path.join(changesDir, d.name, 'intent.md')))
    .map((d) => {
      const read = (kind) => {
        const p = path.join(changesDir, d.name, `${kind}.md`);
        return existsSync(p) ? readFileSync(p, 'utf8') : '';
      };
      return {
        folder: d.name,
        title: readTitle(read('intent')),
        intent: readStatus(read('intent')),
        spec: readStatus(read('spec')),
        plan: readStatus(read('plan')),
      };
    });
  if (writeIfChanged(path.join(changesDir, 'README.md'), renderIndex(entries))) changed++;
  else kept++;

  log(`chain:sync: ${rendered.length} issue, ${changed} file đổi, ${kept} file giữ nguyên.`);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main({ argv: process.argv.slice(2) });
}
