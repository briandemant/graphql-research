const path = require('path')

module.exports = {
  preset: 'ts-jest',
  displayName: '',
  rootDir: process.cwd(),
  testEnvironment: 'node',
  setupFilesAfterEnv: [path.resolve(__dirname, './jest.setup.js')],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/lib/src/**/*.(ts|tsx)',
    "!**/node_modules/**"
  ],
  testMatch: ['**/src/**/__tests__/**/*.test.(ts|tsx)'],
}
