import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Add the properties you want to update in the UpdateUserDto class.
  // For example, to update the name and email fields, add the following code:
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  email: string;
}
