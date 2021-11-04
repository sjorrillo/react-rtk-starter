const config = {
  bail: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/setup.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'node', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  testRegex: '/__(tests|specs)__/.*.([\\.test\\.spec])\\.(j|t)sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e'],
};

module.exports = config;
