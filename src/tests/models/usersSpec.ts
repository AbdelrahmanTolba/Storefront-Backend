import { LoggingStore } from '../../models/authantication';
import { checkingOnPassword } from '../../controllers/hashPassword';
import { User } from './../../interfaces/user.interface';
import { UserStore } from './../../models/users';

const Users: UserStore = new UserStore();
const LoginUser: LoggingStore = new LoggingStore();
let userId: number;
describe('Test Users Model', () => {
  const NewUser: User = {
    email: 'abdelrahman@gmail.com',
    firstname: 'Abdelrahman',
    lastname: 'Tolba',
    password: 'password123',
  };
  it('create method', async () => {
    const result = await Users.create(NewUser);
    userId = result.id as unknown as number;
    expect(result).toBeDefined();
  });

  it('index method', () => {
    async () => {
      const result = await Users.index();
      expect(result).toBeDefined();
    };
  });

  it('select user method', async () => {
    const result = await Users.show(userId);
    expect(result.id).toEqual(userId);
    expect(result.email).toEqual('abdelrahman@gmail.com');
    expect(result.firstname).toEqual('Abdelrahman');
    expect(result.lastname).toEqual('Tolba');
    expect(checkingOnPassword(NewUser.password, result.password)).toBeTrue();
  });

  it('update method', async () => {
    const updatedUser = {
      id: userId,
      email: 'abdelrahman@gmail.com',
      firstname: 'Abdelrahman',
      lastname: 'Tolba2',
      password: 'password123',
    };
    const result = await Users.update(updatedUser);
    expect(result).toBeDefined();
    expect(result.id).toEqual(userId);
    expect(result.email).toEqual('abdelrahman@gmail.com');
    expect(result.firstname).toEqual('Abdelrahman');
    expect(result.lastname).toEqual('Tolba2');
    expect(checkingOnPassword(NewUser.password, result.password)).toBeTrue();
  });

  it('authantecation method', async () => {
    const email = 'abdelrahman@gmail.com';
    const password = 'password123';
    const result = await LoginUser.authenticatedUser(email, password);
    expect(result).toBeDefined();
  });

  it('detele method', async () => {
    const getAllUsers = await Users.index();
    const userId = getAllUsers[0].id as number;
    await Users.delete(userId);
    const users = await Users.index();
    expect(users.length).toEqual(0);
  });
  afterAll(async () => {
    await Users.delete(userId);
  });
});
