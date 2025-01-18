import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
    };
    const result = { id: '1', ...createUserDto };
    jest.spyOn(usersService, 'create').mockImplementation(async () => result);

    expect(await usersController.create(createUserDto)).toBe(result);
  });

  it('should return a 409 since a user with that email already exists', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
    };
    jest.spyOn(usersService, 'create').mockResolvedValue(null);
    try {
      await usersController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });

  it('should find all users', async () => {
    const result = [{ id: '1', name: 'John', email: 'john@example.com' }];
    jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);
  });

  it('should find one user by id', async () => {
    const result = { id: '1', name: 'John', email: 'john@example.com' };
    jest.spyOn(usersService, 'findOne').mockImplementation(async () => result);

    expect(await usersController.findOne('1')).toBe(result);
  });

  it('should return a 404 if user not found', async () => {
    jest.spyOn(usersService, 'findOne').mockImplementation(async () => {
      throw new NotFoundException('User not found');
    });

    try {
      await usersController.findOne('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };
    const result = { id: '1', ...updateUserDto };
    jest
      .spyOn(usersService, 'update')
      .mockImplementation(async () => result as unknown as UpdateResult);

    expect(await usersController.update('1', updateUserDto)).toBe(result);
  });

  it('should delete a user', async () => {
    const result = { affected: 1 };
    jest
      .spyOn(usersService, 'remove')
      .mockImplementation(async () => result as unknown as DeleteResult);

    expect(await usersController.remove('1')).toBe(result);
  });

  it('should count users', async () => {
    const result = 5;
    jest.spyOn(usersService, 'count').mockImplementation(async () => result);

    expect(await usersController.count()).toBe(result);
  });
});
