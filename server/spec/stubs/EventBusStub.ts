import { IEventBus } from "../../interfaces/IEventBus";

export class EventBusStub implements IEventBus {

    dispatch(event: any): void {
        console.log("\nevent dispatched");
    }

}