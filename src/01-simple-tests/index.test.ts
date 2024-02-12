// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 5, action: Action.Add });
    expect(result).toBe(10);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 42, b: 20, action: Action.Subtract });
    expect(result).toBe(22);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 2, action: Action.Multiply });
    expect(result).toBe(24);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 2, action: Action.Divide });
    expect(result).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const invalidAction = '++';
    const result = simpleCalculator({ a: 3, b: 3, action: invalidAction });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '13',
      b: 'argument b',
      action: Action.Add,
    });
    expect(result).toBeNull();

    const result2 = simpleCalculator({ a: 13, b: '13', action: Action.Add });
    expect(result2).toBeNull();
  });
});
