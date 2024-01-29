import React from "react";
import type { Preview } from "@storybook/react";
import { GlobalProvider } from "../assets/js/src/modules/app/components/global-provider";

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
        <Story />
      </GlobalProvider>
    ),
  ],
};

export default preview;
