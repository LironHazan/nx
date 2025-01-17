import * as chalk from 'chalk';
import { execSync, ExecSyncOptions } from 'child_process';
import { join } from 'path';

export function generateDevkitDocumentation() {
  console.log(`\n${chalk.blue('i')} Generating Documentation for Devkit\n`);

  const execSyncOptions: ExecSyncOptions = {
    stdio: process.env.CI === 'true' ? 'inherit' : 'ignore',
  };

  execSync(
    'nx build typedoc-theme && rm -rf node_modules/@nrwl/typedoc-theme && cp -R dist/typedoc-theme node_modules/@nrwl/typedoc-theme',
    execSyncOptions
  );

  execSync(
    `rm -rf docs/generated/devkit && npx typedoc packages/devkit/index.d.ts packages/devkit/ngcli-adapter.ts --tsconfig packages/devkit/tsconfig.lib.json --out ./docs/generated/devkit --hideBreadcrumbs true --disableSources --publicPath ../../devkit/ --theme nx-markdown-theme --readme none`,
    execSyncOptions
  );
  execSync(
    `rm -rf docs/generated/devkit/modules.md docs/generated/devkit/.nojekyll`,
    execSyncOptions
  );
  execSync(
    `rm -rf docs/generated/devkit/modules.md docs/generated/devkit/README.md`,
    execSyncOptions
  );
  execSync(
    `npx prettier docs/generated/devkit --write --config ${join(
      __dirname,
      '..',
      '..',
      '..',
      '.prettierrc'
    )}`,
    execSyncOptions
  );
}
