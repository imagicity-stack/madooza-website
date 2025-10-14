import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { webcrypto } from 'node:crypto';

// Ensure Web Crypto APIs are available when Vite/Tailwind execute in Node.
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
} else if (
  typeof globalThis.crypto.getRandomValues !== 'function' &&
  typeof webcrypto?.getRandomValues === 'function'
) {
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}

export default defineConfig({
  plugins: [react()],
});
