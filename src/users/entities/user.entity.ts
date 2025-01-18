import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 75,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;
}

export type SafeUser = Omit<User, 'password'>;
