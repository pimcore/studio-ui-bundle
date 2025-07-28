/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Options } from '@swc/core';
import type { StorybookConfig } from "storybook-react-rsbuild";

const config: StorybookConfig = {
  stories: ["../js/**/*.mdx", "../js/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  typescript: {
    reactDocgen: 'react-docgen-typescript',

    reactDocgenTypescriptOptions: {
      propFilter: (prop: any) => {
        const res = /antd|rc-image/.test(prop.parent?.fileName) || !/node_modules/.test(prop.parent?.fileName);
        return prop.parent ? res : true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,      
    }
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-swc"
  ],
  framework: {
    name: "storybook-react-rsbuild",
    options: {
      builder: {
      },
    },
  },

  docs: {
    autodocs: "tag",
  },

  rsbuildFinal: (config) => {
    const pluginsToFilterOut = [
      'entrypoints-generate',
      'rsbuild:module-federation-enhanced'
    ]

    const plugins = config.plugins!.filter((plugin) => {
      // Filter out specific plugins
      if (typeof plugin === 'object' && 'name' in plugin! && pluginsToFilterOut.includes(plugin!.name)) {
        return false;
      }

      return true;
    });

    return {
      ...config,
      dev: {
        ...config.dev,
        client: {
          port: 6006
        },
        writeToDisk: false,
        assetPrefix: '/storybook/'
      },
      output: {
        ...config.output,
        assetPrefix: '/storybook/',
      },
      plugins: [
        ...plugins
      ]
    };
  },

  // Enable typescript decorators for storybook
  swc: (config: Options): Options => {
    return {
      ...config,
      jsc: {
        ...config.jsc,
        parser: {
          syntax: "typescript",
          tsx: true,
          dynamicImport: true,
          decorators: true,
        },
      },
    };
  },

  staticDirs: [{from: __dirname + '/../../doc/img', to: 'img'}],
};

export default config;
