import { hashPassword, comparePassword } from '../../src/utils/hash';

describe('Password hashing utility', () => {
  it('should hash and validate a password correctly', async () => {
    const plain = 'myStrongPassword123';
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash).toContain('$');

    const isValid = await comparePassword(plain, hash);
    expect(isValid).toBeTruthy();
  });

  it('should reject invalid password', async () => {
    const hash = await hashPassword('password1');
    const result = await comparePassword('wrongPassword', hash);
    expect(result).toBeFalsy();
  });
});
