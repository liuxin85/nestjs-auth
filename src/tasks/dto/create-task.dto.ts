import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Build auth system' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Implement JWT with refresh tokens',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
