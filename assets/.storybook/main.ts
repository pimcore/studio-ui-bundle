/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import type { Options } from '@swc/core';
import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

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
    name: "@storybook/react-webpack5",
    options: {
      builder: {},
    },
  },

  docs: {
    autodocs: "tag",
  },

  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "@Pimcore": path.resolve(__dirname, "../js/src/core"),
    };

    // disable whatever is already set to load SVGs
    // Exclude inline SVGs for package "@svgr/webpack" from the default encore rule
    config?.module?.rules?.forEach(rule => {
      if (!rule || typeof rule !== 'object') return;
      if (rule.test instanceof RegExp && rule.test.test('.svg')) {
        rule.exclude = /\.inline.svg$/;
      }
    });

    // add SVGR instead
    config!.module!.rules!.push({
      test: /\.inline.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { 
            icon: true,
            typescript: true
          } 
        },
      ],
    });

    return config;
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
