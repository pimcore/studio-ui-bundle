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

    return config;
  }
};

export default config;
