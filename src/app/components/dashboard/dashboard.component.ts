import { Component, OnInit } from '@angular/core';

// Modules
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { EventLog } from '../../shared/types/event-log';
import { EventsResponse } from '../../shared/types/events-response';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventForm } from '../../shared/types/event-form';
import { EventFilterParams } from '../../shared/types/event-filter-params';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  providers: [EventService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventForm!: FormGroup;
  startDate: string | null = null;
  endDate: string | null = null;
  selectedEventType: string = 'Api';
  lastEvaluatedKey: any;
  events: Array<EventLog> = [];
  visibleEvents: Array<EventLog> = [];
  currentPage = 1;
  itemsPerPage = 5;
  isLoading = false;
  hasMoreItems = true;

  constructor(private _eventService: EventService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.loadMore();
  }

  initForm(){
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);
    
    this.eventForm = this._formBuilder.group({
      eventType: ['Api', [Validators.required]],
      startDate: [this.formatDate(today), [Validators.required]],
      endDate: [this.formatDate(endDate), [Validators.required]],
    });

    this.eventForm.valueChanges.subscribe(() => {
      this.filterEvents();
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadMore() {
    if (this.isLoading || !this.hasMoreItems) return;
  
    this.isLoading = true;
  
    const { startDate, endDate, eventType } = this.eventForm.getRawValue() as EventForm;
  
    const eventFormFilter: EventFilterParams = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      lastEvaluatedKey: this.lastEvaluatedKey,
      startDate,
      endDate,
      type: eventType
    };
  
    this._eventService.getEvents(eventFormFilter).subscribe({
      next: ({ items, lastEvaluatedKey }: EventsResponse) => {
        if (items.length) {
          this.visibleEvents.push(...items);
          this.currentPage++;
          this.lastEvaluatedKey = lastEvaluatedKey;
        } else {
          this.hasMoreItems = false;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    });
  }
  

  resetParamsLoadEvents(){
    this.currentPage = 1; 
    this.itemsPerPage = 5; 
    this.lastEvaluatedKey = null;
    this.visibleEvents = [];
    this.hasMoreItems = true;
  }

  filterEvents() {
    if (this.eventForm.valid) {
      this.resetParamsLoadEvents();
      this.loadMore();
    }
  }

  onDateChange() {
    if (this.startDate && this.endDate) {
      console.log('Rango de fechas seleccionado:', this.startDate, this.endDate);
    }
  }
}
