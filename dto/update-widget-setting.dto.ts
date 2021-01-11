import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { WidgetSettingDto } from '../dto';

export class UpdateWidgetSettingDto {
  @ApiModelProperty()
  @ValidateNested()
  @IsNotEmpty()
  @IsArray()
  public widgetSettings: WidgetSettingDto[];
}
