/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript', tsx: true, decorators: true },
        transform: { react: { runtime: 'automatic' } }
      }
    }]
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './js/test-utils/jest-setup.ts'
  ],
  moduleNameMapper: {
    '^.+\\.inline\\.svg\\?react$': '<rootDir>/js/test-utils/mocks/svg-react-mock.tsx',
    '^.+\\.svg\\?react$': '<rootDir>/js/test-utils/mocks/svg-react-mock.tsx',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/js/test-utils/mocks/style-mock.ts',
    '^@Pimcore/(.*)$': '<rootDir>/js/src/core/$1',
    '^@sdk/(.*)$': '<rootDir>/js/src/sdk/$1',
    '^@test-utils/(.*)$': '<rootDir>/js/test-utils/$1'
  },
}

export default config
