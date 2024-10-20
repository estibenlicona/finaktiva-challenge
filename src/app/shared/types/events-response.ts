import { EventLog } from "./event-log";

export interface EventsResponse {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    items: Array<EventLog>;
    lastEvaluatedKey: any;
}