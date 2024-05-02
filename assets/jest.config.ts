/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { type JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './assets/js/test-utils/jest-setup.ts'
  ],
  moduleNameMapper: {
    '^@Pimcore/(.*)$': '<rootDir>/assets/js/src/$1',
    '^@test-utils/(.*)$': '<rootDir>/assets/js/test-utils/$1'
  }
}

export default config