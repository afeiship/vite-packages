import { build } from 'vite';
import { join } from 'path';
import { readFileSync } from 'fs';
import type { InlineConfig } from 'vite';
import glob from 'glob';
import fn from '../src';

function compiledApp(name: string) {
  const distPath = join(__dirname, 'fixtures', name, 'dist');
  const files = glob.sync('assets/app.*.js', { cwd: distPath });
  return readFileSync(join(distPath, files[0]), { encoding: 'utf8' });
}

async function buildFixture(name: string, options?: InlineConfig) {
  const root = join(__dirname, 'fixtures', name);
  await build({ root, logLevel: 'warn', ...options });
}

describe('api.basic', () => {
  test('normail single value case', async () => {
    try {
      await buildFixture('app-a', { mode: 'staging' });
    } catch (e) {
      console.log('err', e);
      // expect(e).toBe('process.env.NODE_ENV');
    }
  });
});
