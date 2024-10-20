import { EventLog } from "./event-log";

export interface EventFilterParams {
  page: number;
  limit: number;
  type: string;
  startDate: string;
  endDate: string;
  lastEvaluatedKey?: EventLog;
}
