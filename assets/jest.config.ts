/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './js/test-utils/jest-setup.ts'
  ],
  moduleNameMapper: {
    '^@Pimcore/(.*)$': '<rootDir>/js/src/core/$1',
    '^@test-utils/(.*)$': '<rootDir>/js/test-utils/$1'
  },
}

export default config
