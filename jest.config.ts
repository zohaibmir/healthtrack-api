module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './jest-setup.ts', // Path to global setup script
  //globalTeardown: './jest-teardown.ts', // Optional teardown script
  testTimeout: 30000, // Increase timeout if database operations take longer
  clearMocks: true, // Automatically clear mock calls, instances, contexts and results before every test
  collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
  verbose: true, // Indicates whether each individual test should be reported during the run
  coverageDirectory: "coverage", // The directory where Jest should output its coverage files
  coverageProvider: "v8", // Indicates which provider should be used to instrument code for coverage
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore transpiled files
};