import { IEventBus } from "../../../../shared/IEventBus";


export class EventBusStub implements IEventBus {

    dispatch(event: any): void {}
}