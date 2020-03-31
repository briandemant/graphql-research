const path = require('path')

module.exports = {
  preset: 'ts-jest',
  displayName: 'SERVER',
  rootDir: process.cwd(),
  testEnvironment: 'node',
  setupFilesAfterEnv: [path.resolve(__dirname, './jest.setup.js')],
  collectCoverage: false,
  collectCoverageFrom: ['**/src/**/*.(ts|tsx)'],
  testMatch: ['**/src/**/__tests__/*.test.(ts|tsx)'],
}
