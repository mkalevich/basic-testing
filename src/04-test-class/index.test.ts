// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';
import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  const INITIAL_BALANCE = 100;

  const bankAccount = getBankAccount(INITIAL_BALANCE);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const WITHDRAWN_AMOUNT = 120;

    expect(() => bankAccount.withdraw(WITHDRAWN_AMOUNT)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const INCORRECT_TRANSFER_AMOUNT = 130;
    const recipientBankAccount = getBankAccount(INITIAL_BALANCE);

    expect(() =>
      bankAccount.transfer(INCORRECT_TRANSFER_AMOUNT, recipientBankAccount),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const CORRECT_TRANSFER_AMOUNT = 90;

    expect(() =>
      bankAccount.transfer(CORRECT_TRANSFER_AMOUNT, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositBankAccount = getBankAccount(INITIAL_BALANCE);
    depositBankAccount.deposit(30);
    const currentBalance = depositBankAccount.getBalance();

    expect(currentBalance).toBe(130);
  });

  test('should withdraw money', () => {
    const WITHDRAW_AMOUNT = 30;
    const WITHDRAW_RESULT = 70;
    const withdrawBankAccount = getBankAccount(INITIAL_BALANCE);

    expect(withdrawBankAccount.withdraw(WITHDRAW_AMOUNT).getBalance()).toBe(
      WITHDRAW_RESULT,
    );
  });

  test('should transfer money', () => {
    const TRANSFER_AMOUNT = 70;
    const baseBankAccount = getBankAccount(INITIAL_BALANCE);
    const recipientBankAccount = getBankAccount(INITIAL_BALANCE);
    baseBankAccount.transfer(TRANSFER_AMOUNT, recipientBankAccount);

    expect(baseBankAccount.getBalance()).toBe(
      INITIAL_BALANCE - TRANSFER_AMOUNT,
    );
    expect(recipientBankAccount.getBalance()).toBe(
      INITIAL_BALANCE + TRANSFER_AMOUNT,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const MOCK_RANDOM_NUMBER = 50;
    (random as jest.Mock).mockImplementation(() => MOCK_RANDOM_NUMBER);
    const baseBankAccount = getBankAccount(INITIAL_BALANCE);

    const result = await baseBankAccount.fetchBalance();

    expect(result).toBe(MOCK_RANDOM_NUMBER);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const MOCK_RANDOM_NUMBER = 42;

    const baseBankAccount = getBankAccount(INITIAL_BALANCE);

    (random as jest.Mock).mockImplementation(() => MOCK_RANDOM_NUMBER);

    await baseBankAccount.synchronizeBalance();

    expect(baseBankAccount.getBalance()).toBe(MOCK_RANDOM_NUMBER);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const MOCK_RANDOM_NUMBER = 0;

    const baseBankAccount = getBankAccount(INITIAL_BALANCE);

    (random as jest.Mock).mockImplementation(() => MOCK_RANDOM_NUMBER);

    await expect(baseBankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
