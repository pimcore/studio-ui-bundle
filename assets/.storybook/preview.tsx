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

import React from "react";
import '../js/src/core/bootstrap';
import type { Preview } from "@storybook/react";
import "../css/globals.css";
import { GlobalProvider } from "../js/src/core/modules/app/global-provider";
import { GlobalStyles } from "../js/src/core/styles/global.styles";
import { App } from 'antd'
import { Pimcore } from '../js/src/core/app/public-api'
import { moduleSystem } from "../js/src/core/app/module-system/module-system";

declare global {
  interface Window {
    Pimcore: typeof Pimcore
  }
}

window.Pimcore = Pimcore;
moduleSystem.initModules();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Docs',
          [
            'Overview',
            'Core',
            'SDK'
          ],
          'Components',
          [
            'General',
            'Layout',
            'Controls',
            'Data Display',
            'Feedback',
            'Visuals',
            'Others',
            '*'
          ],
          'Tools',
          'Modules',
        ]
      }
    }
  },

  decorators: [
    (Story) => {
      return (
        <GlobalProvider>
          <App>
            <GlobalStyles />
            <Story />
          </App>
        </GlobalProvider>
      )
    }
  ],

  tags: ['autodocs']
};

export default preview;
