import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Node >= 22 có localStorage toàn cục (thực nghiệm, undefined nếu không bật) che mất bản của jsdom.
// Dùng một Storage trong bộ nhớ để test chạy giống nhau trên mọi phiên bản Node.
class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(key: string) { return this.data.get(key) ?? null; }
  key(index: number) { return [...this.data.keys()][index] ?? null; }
  removeItem(key: string) { this.data.delete(key); }
  setItem(key: string, value: string) { this.data.set(key, String(value)); }
}
Object.defineProperty(globalThis, 'localStorage', { value: new MemoryStorage(), configurable: true });

afterEach(() => {
  cleanup();
  localStorage.clear();
});
