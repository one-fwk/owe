module.exports = {
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: 'jest-extended',
  moduleNameMapper: {
    '@owe/(.*)': '<rootDir>/packages/$1/src',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
    },
  },
  testMatch: [
    '<rootDir>/packages/**/*.spec.ts',
  ],
};