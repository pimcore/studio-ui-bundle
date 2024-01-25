import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "./assets/js/test-utils/jest-setup.ts"
  ],
  moduleNameMapper: {
    '^@Pimcore/(.*)$': '<rootDir>/assets/js/src/$1',
    '^@test-utils/(.*)$': '<rootDir>/assets/js/test-utils/$1'
  },
};

export default config
