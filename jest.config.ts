module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if you're using path aliases
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };