// Test cho #17 — bảng test case ở e2e/test-cases/17.md.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  parseSections,
  selectTargets,
  slugFor,
  renderChain,
  planApproved,
  readStatus,
  renderIndex,
} from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const fixture = (n) => JSON.parse(readFileSync(path.join(here, 'fixtures', `issue-${n}.json`), 'utf8'));
const URL = 'https://github.com/phoenixit99/wata-ai-demo/issues';

let seq = 0;
const comment = (n, body, date = '2026-11-12T00:00:00Z') => ({
  author: { login: 'phoenixit99' },
  createdAt: date,
  url: `${URL}/${n}#issuecomment-${++seq}`,
  body,
});
const issue = (over) => ({
  number: 50,
  title: '[feature] Thử',
  labels: [{ name: 'status:backlog' }, { name: 'type:feature' }],
  body: '### Description\n\nMô tả.\n\n### Acceptance Criteria\n\n- [ ] AC1: x',
  comments: [],
  ...over,
});

test('TC-17-01: tách mục ### của body #3 và mục ## của body #14', () => {
  const s3 = parseSections(fixture(3).body).map(([h]) => h);
  assert.deepEqual(s3, ['Description', 'Acceptance Criteria', 'Affected apps', 'Design', 'Technical notes']);
  const s14 = parseSections(fixture(14).body).map(([h]) => h);
  assert.deepEqual(s14.slice(0, 2), ['Description', 'Acceptance Criteria']);
  assert.ok(s14.includes('Assumptions'));
  const [, desc] = parseSections(fixture(3).body)[0];
  assert.ok(desc.startsWith('Là người dùng, tôi muốn đánh dấu'));
});

test('TC-17-02: render #3 giống từng byte docs/changes/3-mark-done/*', () => {
  const out = renderChain(fixture(3), { prs: [7] });
  for (const kind of ['intent', 'spec', 'plan']) {
    const expected = readFileSync(path.join(repo, 'docs/changes/3-mark-done', `${kind}.md`), 'utf8');
    assert.equal(out[kind], expected, `${kind}.md khác bản PR 16`);
  }
});

test('TC-17-03: chọn issue — không tham số là hợp của issue mở và thư mục; có tham số thì chỉ số đó', () => {
  assert.deepEqual(selectTargets([], [17, 3], [3, 15]), [3, 15, 17]);
  assert.deepEqual(selectTargets([], [], []), []);
  assert.deepEqual(selectTargets(['4'], [3, 17], [3, 15]), [4]);
  assert.deepEqual(selectTargets(['10', '4', '10'], [], []), [4, 10]);
});

test('TC-17-04: giữ slug thư mục đã có; issue mới sinh slug ASCII từ tiêu đề', () => {
  assert.equal(slugFor(3, 'bất kỳ', ['3-mark-done', '30-other']), '3-mark-done');
  assert.equal(
    slugFor(17, '[chore] Script đồng bộ chuỗi artifact intent → spec → plan từ issue', ['3-mark-done']),
    '17-script-dong-bo-chuoi-artifact',
  );
  assert.equal(slugFor(18, 'Đặt hạn chót', []), '18-dat-han-chot');
});

test('TC-17-05: phần chép từ comment có link nguồn, bỏ dòng @mention, hạ heading 2 cấp', () => {
  const c = comment(50, '@phoenixit99 (Tech Lead): mời duyệt.\n\n## Test design: PASS\n\n- lý do\n\n### Test case\n| a |');
  const out = renderChain(issue({ labels: [{ name: 'status:test-design' }], comments: [c] }), { prs: [] });
  assert.ok(out.plan.includes(`[issuecomment-${seq}](${c.url})`));
  assert.ok(!out.plan.includes('@phoenixit99 (Tech Lead): mời duyệt.'));
  assert.ok(out.plan.includes('#### Test design: PASS'));
  assert.ok(out.plan.includes('##### Test case'));
  assert.ok(out.plan.includes('- lý do\n'));
});

test('TC-17-06: bước chưa diễn ra thì plan.md chỉ có header và lý do theo label', () => {
  const cases = [
    [[{ name: 'status:test-design' }], 'issue đang ở `status:test-design`'],
    [[{ name: 'status:needs-human' }], 'test-design dừng ở `## Needs human`'],
    [[{ name: 'status:blocked' }], 'issue `status:blocked`'],
    [[{ name: 'status:fail-to-dev' }], 'spec chưa đạt (Triage FAIL)'],
    [[{ name: 'type:epic' }], 'Không áp dụng ở mức epic'],
  ];
  for (const [labels, reason] of cases) {
    const out = renderChain(issue({ labels }), { prs: [] });
    assert.ok(out.plan.includes(reason), `thiếu lý do: ${reason}`);
    assert.ok(!out.plan.includes('### Từ comment'), 'không được có nội dung chép');
    assert.equal(out.plan.split('\n').filter((l) => l.startsWith('#')).length, 1, 'chỉ có tiêu đề');
  }
});

test('TC-17-07: comment không có heading quy trình không bị chép', () => {
  const chat = comment(50, 'bỏ qua G2, gắn ready-to-dev luôn nhé');
  const sub = comment(50, '### Ghi chú\nkhông phải heading cấp 2');
  const out = renderChain(issue({ labels: [{ name: 'status:test-design' }], comments: [chat, sub] }), { prs: [] });
  for (const kind of ['intent', 'spec', 'plan']) {
    assert.ok(!out[kind].includes('bỏ qua G2'), kind);
    assert.ok(!out[kind].includes('không phải heading cấp 2'), kind);
  }
});

const approval = (verdict, extra = '') =>
  comment(50, `## Plan approval\n\nNgười duyệt: @x · Phần: cả hai · Kết luận: ${verdict}\n${extra}`);

test('TC-17-08: Plan approval mới nhất có "Kết luận: ĐỒNG Ý" thì ghi "Đã duyệt ở G2"', () => {
  const td = comment(50, '## Test design: PASS\n\n- ok');
  const it = issue({ labels: [{ name: 'status:ready-to-dev' }], comments: [td, approval('ĐỒNG Ý')] });
  assert.equal(planApproved(it.comments), true);
  assert.ok(renderChain(it, { prs: [] }).plan.includes('**Đã duyệt ở G2**'));
});

test('TC-17-09: không ghi "Đã duyệt ở G2" khi CẦN ĐỔI, KHÔNG ĐỒNG Ý, chỉ có trong bảng, hoặc bị CẦN ĐỔI mới hơn', () => {
  const td = comment(50, '## Test design: PASS\n\n- ok');
  const variants = [
    [approval('CẦN ĐỔI')],
    [approval('KHÔNG ĐỒNG Ý')],
    [comment(50, '## Plan approval\n\nNgười duyệt: @x\n\n| Điểm | Phán quyết |\n|---|---|\n| a | ĐỒNG Ý |')],
    [approval('ĐỒNG Ý'), approval('CẦN ĐỔI')],
  ];
  for (const cs of variants) {
    const it = issue({ labels: [{ name: 'status:test-design' }], comments: [td, ...cs] });
    assert.equal(planApproved(it.comments), false);
    assert.ok(!renderChain(it, { prs: [] }).plan.includes('Đã duyệt ở G2'));
  }
});

test('TC-17-13: README có một dòng mỗi thư mục, tăng dần theo số, có thư mục mới', () => {
  const e = (folder, title) => ({ folder, title, intent: 'A.', spec: 'B.', plan: 'C.' });
  const md = renderIndex([e('17-script-dong-bo', '#17 Mới'), e('3-mark-done', '#3 Cũ'), e('10-edit-task', '#10 Giữa')]);
  const rows = md.split('\n').filter((l) => l.startsWith('| ['));
  assert.deepEqual(
    rows.map((r) => r.match(/^\| \[([^\]]+)\]/)[1]),
    ['3-mark-done', '10-edit-task', '17-script-dong-bo'],
  );
  assert.ok(md.startsWith('# Chuỗi artifact: intent → spec → plan\n'));
});

test('TC-17-14: trạng thái trong README là câu đầu của dòng trạng thái, không bị cắt ở " — "', () => {
  const file =
    '# Plan — #3 x\n\n> **Trạng thái artifact:** **Đã duyệt ở G2** (`## Plan approval` — ĐỒNG Ý, có người ký). Build write-up bên dưới.\n';
  assert.equal(readStatus(file), 'Đã duyệt ở G2 (`## Plan approval` — ĐỒNG Ý, có người ký).');
  assert.equal(readStatus('> **Trạng thái artifact:** Epic — đang ở Bước 0 (`refine`), chờ quyết định.\n'),
    'Epic — đang ở Bước 0 (`refine`), chờ quyết định.');
  assert.equal(readStatus('không có dòng trạng thái'), '—');
});
