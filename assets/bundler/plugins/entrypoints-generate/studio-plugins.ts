import fs from 'fs';
import type { RsbuildPlugin, ManifestData, OnAfterBuildFn, OnDevCompileDoneFn } from '@rsbuild/core';

interface EntrypointJson {
  entrypoints: {
    [key: string]: {
      js?: string[];
      css?: string[];
    }
  }
}

interface DevServerContext {
  port: number;
  hostname: string;
  https: boolean;
}

type parameters = Parameters<OnAfterBuildFn | OnDevCompileDoneFn>;
type data = parameters[0];

const generateEntrypoints = (data: data, devServer?: DevServerContext): EntrypointJson => {
  const manifest: ManifestData = data.environments.web.manifest as unknown as ManifestData;
  const entrypoints: EntrypointJson = {
    entrypoints: {}
  };

  const hasDevServer = devServer !== undefined;
  let host = 'localhost';

  if (hasDevServer && devServer.hostname !== '0.0.0.0') {
    host = devServer.hostname;
  }

  let hasDomain = false;
  
  for (const [key, value] of Object.entries(manifest.entries)) {
    if (Array.isArray(value?.initial?.js) && value?.initial?.js.length > 0) {
      const js = value.initial.js[0];
      if (js.startsWith('http')) {
        hasDomain = true;
      }
    }

    entrypoints.entrypoints[key] = {
      js: [
        ...value?.async?.js ?? [],
        ...value?.initial?.js ?? [],
      ],
      css: [
        ...value?.async?.css ?? [],
        ...value?.initial?.css ?? [],
      ]
    }
  }

  if (hasDevServer && !hasDomain) {
    for (const [key, value] of Object.entries(entrypoints.entrypoints)) {
      if (Array.isArray(value.js)) {
        for (let i = 0; i < value.js.length; i++) {
          const js = value.js[i];
          if (!js.startsWith('http')) {
            value.js[i] = `http${devServer.https ? 's' : ''}://${host}:${devServer.port}${js}`;
          }
        }
      }

      if (Array.isArray(value.css)) {
        for (let i = 0; i < value.css.length; i++) {
          const css = value.css[i];
          if (!css.startsWith('http')) {
            value.css[i] = `http${devServer.https ? 's' : ''}://${host}:${devServer.port}${css}`;
          }
        }
      }
    }
  }

  if (hasDomain && !hasDevServer) {
    for (const [key, value] of Object.entries(entrypoints.entrypoints)) {
      if (Array.isArray(value.js)) {
        for (let i = 0; i < value.js.length; i++) {
          const js = value.js[i];
          if (js.startsWith('http')) {
            value.js[i] = js.replace(/^(https?:\/\/[^\/]+)(.*)$/, '$1' + data.environments.web.config.output.assetPrefix + '$2');
          }
        }
      }

      if (Array.isArray(value.css)) {
        for (let i = 0; i < value.css.length; i++) {
          const css = value.css[i];
          if (css.startsWith('http')) {
            value.css[i] = css.replace(/^(https?:\/\/[^\/]+)(.*)$/, '$1' + data.environments.web.config.output.assetPrefix + '$2');
          }
        }
      }
    }
  }

  const remoteEntrypoints: Record<string, string> = {};
  for (const [key, value] of Object.entries(manifest.entries)) {
    if (value?.initial?.js) {
      for (const js of value.initial.js) {
        if (js.endsWith('remoteEntry.js')) {
          remoteEntrypoints[key] = js;
        }
      }
    }
  }

  fs.writeFileSync(
    `${data.environments.web.config.output.distPath.root}/exposeRemote.js`,
    `
      if (window.pluginRemotes === undefined) {
        window.pluginRemotes = {}
      }

      ${Object.entries(remoteEntrypoints).map((entrypoint) => {
        const [key, value] = entrypoint;
        return `window.pluginRemotes.${key} = "${hasDevServer && !hasDomain ? `http${devServer.https ? 's' : ''}://${host}:${devServer.port}` : ''}${value}"`
      })}
    `
  )

  entrypoints.entrypoints['exposeRemote'] = {
    js: [`${data.environments.web.config.output.assetPrefix}/exposeRemote.js`],
    css: []
  }

  return entrypoints;
}

export const pluginGenerateEntrypoints = (): RsbuildPlugin => ({
  name: 'entrypoints-generate',
  setup(api) {
    api.onAfterBuild((data) => {
      const entrypoints = generateEntrypoints(data);
      const outPath = data.environments.web.config.output.distPath.root
      const entrypointsPath = `${outPath}/entrypoints.json`;
      fs.writeFileSync(entrypointsPath, JSON.stringify(entrypoints, null, 2), 'utf-8');
    })

    api.onDevCompileDone((data) => {
      const entrypoints = generateEntrypoints(data, api.context.devServer);
      const outPath = data.environments.web.config.output.distPath.root
      const entrypointsPath = `${outPath}/entrypoints.json`;
      fs.writeFileSync(entrypointsPath, JSON.stringify(entrypoints, null, 2), 'utf-8');
    })
  }
});
