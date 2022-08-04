const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe('UseUserCreateService', () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it('should create user', async () => {
    const user = {
      name: 'User Test',
      email: 'user@example.com',
      password: 'password',
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty('id');
  });

  it('should not create user if already exists', async () => {
    const user1 = {
      name: 'User Test1',
      email: 'user@example.com',
      password: 'password',
    };

    const user2 = {
      name: 'User Test 2',
      email: 'user@example.com',
      password: 'p4ssw0rd',
    };

    await userCreateService.execute(user1);

    await expect(userCreateService.execute(user1)).rejects.toEqual(
      new AppError('Este e-mail já está em uso.')
    );
  });
});
