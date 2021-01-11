import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsOptional, IsString } from 'class-validator';
import { DashboardInterface } from '../interfaces';
import { BusinessDto } from '../dto';

export class DashboardDto implements DashboardInterface {
  @ApiModelProperty()
  @ValidateNested()
  @IsNotEmpty()
  public business: BusinessDto;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  public name: string;
}
