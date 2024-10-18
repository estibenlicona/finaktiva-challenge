import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Metric} from '../types/metric';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private apiUrl = 'https://q2f2j29i4k.execute-api.us-east-1.amazonaws.com/dev/metrics';

  constructor(private http: HttpClient) { }

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(this.apiUrl);
  }
}
