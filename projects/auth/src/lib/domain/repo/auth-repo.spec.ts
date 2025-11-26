import { AuthApiRepo } from '../../data/api/auth-api-repo';

describe('AuthRepo', () => {
  it('should create an instance', () => {
    expect(new AuthApiRepo()).toBeTruthy();
  });
});
