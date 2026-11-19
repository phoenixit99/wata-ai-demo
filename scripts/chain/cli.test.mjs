// Test cho #17 — chạy CLI với `gh` giả trên thư mục tạm.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { main } from '../sync-chain.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixture = (n) => readFileSync(path.join(here, 'fixtures', `issue-${n}.json`), 'utf8');

function fakeGh({ open = [3, 9], fail } = {}) {
  const calls = [];
  const run = (args) => {
    calls.push(args.join(' '));
    if (fail && fail(args)) throw new Error('gh: authentication required');
    if (args[0] === 'issue' && args[1] === 'list') return JSON.stringify(open.map((number) => ({ number })));
    if (args[0] === 'pr' && args[1] === 'list') return JSON.stringify([{ number: 7, body: 'Refs #3' }]);
    if (args[0] === 'issue' && args[1] === 'view') return fixture(args[2]);
    throw new Error(`lệnh gh không mong đợi: ${args.join(' ')}`);
  };
  return { run, calls };
}

const tempRoot = () => {
  const root = mkdtempSync(path.join(tmpdir(), 'chain-'));
  mkdirSync(path.join(root, 'docs/changes'), { recursive: true });
  return root;
};
const quiet = { log: () => {}, error: () => {} };
const listFiles = (root) =>
  readdirSync(path.join(root, 'docs/changes'), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.md'))
    .sort();

test('TC-17-10: một lượt chạy chỉ gọi lệnh đọc của gh', () => {
  const root = tempRoot();
  const gh = fakeGh();
  assert.equal(main({ argv: [], root, run: gh.run, ...quiet }), 0);
  assert.ok(gh.calls.length > 0);
  for (const c of gh.calls) {
    assert.match(c, /^(issue view|issue list|pr list) /, c);
    assert.doesNotMatch(c, /\b(edit|comment|create|close|delete|api)\b/, c);
  }
});

test('TC-17-11: chạy lần hai không đổi file nào (nội dung và mtime giữ nguyên)', async () => {
  const root = tempRoot();
  const gh = fakeGh();
  assert.equal(main({ argv: [], root, run: gh.run, ...quiet }), 0);
  const files = listFiles(root);
  assert.equal(files.length, 7, files.join(',')); // 2 issue × 3 file + README
  const before = Object.fromEntries(
    files.map((f) => {
      const p = path.join(root, 'docs/changes', f);
      return [f, [readFileSync(p, 'utf8'), statSync(p).mtimeMs]];
    }),
  );
  await new Promise((r) => setTimeout(r, 20));
  const logs = [];
  assert.equal(main({ argv: [], root, run: fakeGh().run, log: (m) => logs.push(m), error: () => {} }), 0);
  for (const f of files) {
    const p = path.join(root, 'docs/changes', f);
    assert.deepEqual([readFileSync(p, 'utf8'), statSync(p).mtimeMs], before[f], f);
  }
  assert.ok(logs.some((m) => m.includes('0 file đổi')), logs.join('\n'));
});

test('TC-17-15: tham số sai thì thoát mã khác 0 và không ghi file', () => {
  for (const bad of ['abc', '0', '-1', '3x']) {
    const root = tempRoot();
    const gh = fakeGh();
    const errors = [];
    assert.notEqual(main({ argv: [bad], root, run: gh.run, log: () => {}, error: (m) => errors.push(m) }), 0, bad);
    assert.equal(gh.calls.length, 0, `không gọi gh khi tham số sai: ${bad}`);
    assert.equal(listFiles(root).length, 0);
    assert.ok(errors.join(' ').includes(bad));
  }
});

test('TC-17-16: gh lỗi thì thoát mã khác 0, nói lệnh nào lỗi, không ghi dở', () => {
  const root = tempRoot();
  const errors = [];
  const gh = fakeGh({ fail: (a) => a[1] === 'view' && a[2] === '9' });
  assert.notEqual(main({ argv: [], root, run: gh.run, log: () => {}, error: (m) => errors.push(m) }), 0);
  assert.ok(errors.join(' ').includes('gh issue view 9'), errors.join('\n'));
  assert.equal(listFiles(root).length, 0, 'không file nào được ghi, kể cả của #3');
  assert.equal(existsSync(path.join(root, 'docs/changes/README.md')), false);
});
