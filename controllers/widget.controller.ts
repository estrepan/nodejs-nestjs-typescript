/*tslint:disable:no-duplicate-string*/
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesEnum } from '@pe/nest-kit/modules/auth';
import { ParamModel } from '@pe/nest-kit';
import { CreateWidgetDto, UpdateWidgetDto, WidgetDto, UpdateWidgetSettingDto } from '../dto';
import { BusinessModel, DashboardModel, WidgetModel } from '../models';
import { BusinessService, WidgetService } from '../services';
import { BusinessSchemaName, DashboardSchemaName, WidgetSchemaName } from '../schemas';

@Controller('business/:businessId/dashboard/:dashboardId/widget')
@ApiUseTags('widget')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// @Roles(RolesEnum.merchant)
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid authorization token.' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
export class WidgetController {
  constructor(
    private readonly widgetService: WidgetService,
    private readonly businessService: BusinessService,
  ) {
  }

  @Get('available-types')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The records have been successfully fetched.',
    isArray: true,
    status: HttpStatus.OK,
    type: String,
  })
  public async availableTypes(
    @ParamModel('businessId', BusinessSchemaName) business: BusinessModel,
  ): Promise<any> {
    return this.businessService.availableTypes(business);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The records have been successfully fetched.',
    isArray: true,
    status: HttpStatus.OK,
    type: WidgetDto,
  })
  public async findAll(
    @ParamModel('dashboardId', DashboardSchemaName) dashboard: DashboardModel,
  ): Promise<WidgetModel[]> {
    return this.widgetService.findAll(dashboard);
  }

  @Get(':widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The record has been successfully fetched.',
    status: HttpStatus.OK,
    type: WidgetDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async findOne(
    @ParamModel('widgetId', WidgetSchemaName) widget: WidgetModel,
  ): Promise<WidgetModel> {
    await widget.populate('dashboard', 'dashboard.business').execPopulate();

    return widget;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.CREATED,
    type: WidgetDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async create(
    @ParamModel('dashboardId', DashboardSchemaName) dashboard: DashboardModel,
    @Body() dto: any,
  ): Promise<WidgetModel> {
    return this.widgetService.create(dashboard, dto);
  }

  @Put(':widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
    type: WidgetDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async update(
    @ParamModel('widgetId', WidgetSchemaName) widget: WidgetModel,
    @Body() dto: UpdateWidgetDto,
  ): Promise<WidgetModel> {
    return this.widgetService.update(widget, dto);
  }

  @Delete(':widgetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async remove(
    @ParamModel('widgetId', WidgetSchemaName) widget: WidgetModel,
  ): Promise<void> {
    await this.widgetService.remove(widget);
  }

  @Put(':widgetId/settings')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
    type: WidgetDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async updateWidgetSettings(
    @ParamModel('widgetId', WidgetSchemaName) widget: WidgetModel,
    @Body() dto: UpdateWidgetSettingDto,
  ): Promise<WidgetModel> {
    return this.widgetService.updateWidgetSettings(widget, dto);
  }
}
