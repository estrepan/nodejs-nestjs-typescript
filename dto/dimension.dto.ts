import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { DimensionInterface } from '../interfaces';
import { DimensionEnum, SizeValueEnum, WidgetTypeEnum } from '../enums';

export class DimensionDto implements DimensionInterface {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(DimensionEnum)
  public name: DimensionEnum;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  public field: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(SizeValueEnum)
  public sizes: SizeValueEnum[];

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(SizeValueEnum)
  public types: WidgetTypeEnum[];
}
