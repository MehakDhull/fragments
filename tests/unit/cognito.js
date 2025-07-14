// tests/unit/cognito.test.js
describe('cognito.js in test mode', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, NODE_ENV: 'test' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('exports dummy authenticate middleware in test mode', () => {
    const cognito = require('../../src/auth/cognito');
    const req = {};
    const res = {};
    const next = jest.fn();

    cognito.authenticate()()(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
