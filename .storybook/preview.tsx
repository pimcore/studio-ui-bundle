import React from "react";
import type { Preview } from "@storybook/react";
import "../assets/css/globals.css";
import { GlobalProvider } from "../assets/js/src/modules/app/global-provider";
import { App } from 'antd'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <GlobalProvider>
        <App>
          <Story />
        </App>
      </GlobalProvider>
    ),
  ],
};

export default preview;
