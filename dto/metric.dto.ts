import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsEnum, IsArray } from 'class-validator';
import { MetricInterface } from '../interfaces';
import { MetricEnum, SizeValueEnum, WidgetTypeEnum } from '../enums';

export class MetricDto implements MetricInterface {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(MetricEnum)
  public name: MetricEnum;

  @ApiModelProperty()
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  @IsEnum(SizeValueEnum)
  public sizes: SizeValueEnum[];

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(WidgetTypeEnum)
  public types: WidgetTypeEnum[];
}
