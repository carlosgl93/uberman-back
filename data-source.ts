import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // Use the service name defined in docker-compose.yml
  port: 5432,
  username: 'carlos-db-admin',
  password: 'carlos817!',
  database: 'uberman',
  entities: [User],
  synchronize: true, // Disable synchronize for production
  migrations: ['src/migrations/*.ts'],
});
