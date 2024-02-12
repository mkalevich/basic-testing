// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 42, b: 2, action: Action.Multiply, expected: 84 },
  { a: 42, b: 2, action: Action.Subtract, expected: 40 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)('Correct operations', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
