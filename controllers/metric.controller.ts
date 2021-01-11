/*tslint:disable:no-duplicate-string*/
import { Controller, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesEnum } from '@pe/nest-kit/modules/auth';
import { MetricDto } from '../dto';
import { MetricModel } from '../models';
import { MetricService } from '../services';

@Controller('metric')
@ApiUseTags('metric')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// @Roles(RolesEnum.merchant)
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid authorization token.' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
export class MetricController {
  constructor(
    private readonly metricService: MetricService,
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'The records have been successfully fetched.',
    isArray: true,
    status: HttpStatus.OK,
    type: MetricDto,
  })
  public async findAll(): Promise<MetricModel[]> {
    return this.metricService.findAll();
  }
}
