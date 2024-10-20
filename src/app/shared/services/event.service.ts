import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsResponse } from '../types/events-response';
import { EventLog } from '../types/event-log';
import { EventFilterParams } from '../types/event-filter-params';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://kymejfqzw1.execute-api.us-east-1.amazonaws.com';

  constructor(private _http: HttpClient) { }

  getEvents(params: EventFilterParams): Observable<EventsResponse> {
    const { page, limit, type, startDate, endDate, lastEvaluatedKey } = params;
    
    let url = `${this.apiUrl}/events/${page}/${limit}/${type}/${startDate}/${endDate}`;
  
    const queryParams = new URLSearchParams();
    if (lastEvaluatedKey) {
      queryParams.set('lastEvaluatedType', lastEvaluatedKey.Type);
      queryParams.set('lastEvaluatedRegistration', String(lastEvaluatedKey.Registration));
    }
  
    if (queryParams.toString()) {
      url = `${url}?${queryParams.toString()}`;
    }
  
    return this._http.get<EventsResponse>(url);
  }
  
}
