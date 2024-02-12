// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(5);
    expect(result).toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'This is an error';
    expect(() => throwError(errorMsg)).toThrowError(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
