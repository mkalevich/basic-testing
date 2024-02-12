// Uncomment the code below and write your tests
// import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';
import * as console from 'console';

jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction: jest.requireActual('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  let logSpy: jest.SpyInstance;
  let nativeConsoleLog: typeof console.log;

  beforeAll(() => {
    nativeConsoleLog = global.console.log;
    global.console = { ...console, log: jest.fn() };

    logSpy = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    logSpy.mockReset();
  });

  afterAll(() => {
    global.console.log = nativeConsoleLog;
    logSpy.mockRestore();
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(logSpy).toHaveBeenCalled();
  });
});
