import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  stories: ["../assets/js/**/*.mdx", "../assets/js/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  docs: {
    autodocs: "tag",
  },

  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "@Pimcore": path.resolve(__dirname, "../assets/js/src"),
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
  }
};

export default config;
