import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDashboardDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  public name: string;
}
