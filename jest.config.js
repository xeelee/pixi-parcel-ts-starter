module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable'
  },
  automock: false,
  resetMocks: false,
  setupFilesAfterEnv: ['jest-webgl-canvas-mock']
};
