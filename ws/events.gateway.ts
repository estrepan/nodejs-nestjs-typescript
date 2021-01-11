import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { verify as jwtVerify } from 'jsonwebtoken';
import { Server } from 'socket.io';
import { EventMessageNameEnum } from '../enums';
import { environment } from '../../environments';
import {
  ConnectPayloadInterface,
  ConnectResponseInterface,
  GetDataPayloadInterface,
  GetDataResponseInterface,
} from '../interfaces';
import { StatisticsService, WidgetService } from '../services';
import { WidgetModel } from '../models';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() private server: Server;

  public constructor(
    private readonly statisticsService: StatisticsService,
    private readonly widgetService: WidgetService,
  ) { }

  @SubscribeMessage(EventMessageNameEnum.EVENT_CONNECTION)
  public async onConnectEvent(client: WebSocket, payload: ConnectPayloadInterface): Promise<ConnectResponseInterface> {
    return {
      name: EventMessageNameEnum.EVENT_CONNECTION,
      result: this.verifyToken(payload.token),
    };
  }

  @SubscribeMessage(EventMessageNameEnum.GET_DATA)
  public async onGetDataEvent(client: WebSocket, payload: GetDataPayloadInterface): Promise<GetDataResponseInterface> {
    const token: string = payload.token;

    /*if (!this.verifyToken(token)) {
      return {
        name: EventMessageNameEnum.GET_DATA,
        result: false,
      };
    }*/

    try {
      const widget: WidgetModel = await this.widgetService.findOneById(payload.widgetId);

      if (!widget) {
        throw new Error('Widget does not exist.')
      }

      const data: any = await this.statisticsService.getData(widget, true);

      return {
        data,
        name: EventMessageNameEnum.GET_DATA,
        result: true,
      };
    } catch (e) {
      return {
        name: EventMessageNameEnum.GET_DATA,
        result: e.message,
      };
    }
  }

  private verifyToken(token: string): boolean {
    try {
      jwtVerify(token, environment.jwtOptions.secret);
    } catch (e) {
      return false;
    }

    return true;
  }
}
