/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { ModalsProvider } from "../js/src/core/modules/app/modals-provider";

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
            'Data Entry',
            [
              'Form',
              [
                'Form vs FormKit',
                'Basic Form',
                'FormKit',
                'Controls',
                [
                  'Basic',
                  'Composite',
                  '*'
                ],
                '*'
              ],
              '*'
            ],
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
            <ModalsProvider>
              <GlobalStyles />
              <Story />
            </ModalsProvider>
          </App>
        </GlobalProvider>
      )
    }
  ],

  tags: ['autodocs']
};

export default preview;
