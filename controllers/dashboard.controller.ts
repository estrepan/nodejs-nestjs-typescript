/*tslint:disable:no-duplicate-string*/
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesEnum } from '@pe/nest-kit/modules/auth';
import { ParamModel } from '@pe/nest-kit';
import { CreateDashboardDto, DashboardDto, UpdateDashboardDto } from '../dto';
import { BusinessModel, DashboardModel } from '../models';
import { DashboardService } from '../services';
import { BusinessSchemaName, DashboardSchemaName } from '../schemas';

@Controller('business/:businessId/dashboard')
@ApiUseTags('dashboard')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// @Roles(RolesEnum.merchant)
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid authorization token.' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The records have been successfully fetched.',
    isArray: true,
    status: HttpStatus.OK,
    type: DashboardDto,
  })
  public async findAll(): Promise<DashboardModel[]> {
    return this.dashboardService.findAll();
  }

  @Get(':dashboardId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The record has been successfully fetched.',
    status: HttpStatus.OK,
    type: DashboardDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async findOne(
    @ParamModel('dashboardId', DashboardSchemaName) dashboard: DashboardModel,
  ): Promise<DashboardModel> {
    await dashboard.populate('business').execPopulate();

    return dashboard;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.CREATED,
    type: DashboardDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async create(
    @ParamModel(':businessId', BusinessSchemaName) business: BusinessModel,
    @Body() dto: CreateDashboardDto,
  ): Promise<DashboardModel> {
    return this.dashboardService.create(dto, business);
  }

  @Put(':dashboardId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
    type: DashboardDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async update(
    @ParamModel('dashboardId', DashboardSchemaName) dashboard: DashboardModel,
    @Body() dto: UpdateDashboardDto,
  ): Promise<DashboardModel> {
    return this.dashboardService.update(dashboard, dto);
  }

  @Delete(':dashboardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  public async remove(
    @ParamModel('dashboardId', DashboardSchemaName) dashboard: DashboardModel,
  ): Promise<void> {
    await this.dashboardService.remove(dashboard);
  }
}
