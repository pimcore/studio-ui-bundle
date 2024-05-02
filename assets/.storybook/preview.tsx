/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React from "react";
import '../js/src/bootstrap';
import type { Preview } from "@storybook/react";
import "../css/globals.css";
import { GlobalProvider } from "../js/src/modules/app/global-provider";
import { App } from 'antd'

const preview: Preview = {
  parameters: {
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
