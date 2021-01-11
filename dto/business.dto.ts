import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BusinessInterface } from '../interfaces';

export class BusinessDto implements BusinessInterface {
  @ApiModelPropertyOptional()
  @IsOptional()
  public installedApps: any[];

  @ApiModelPropertyOptional()
  @IsOptional()
  public themeSettings: any;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  public createdAt: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  public updatedAt: string;
}
