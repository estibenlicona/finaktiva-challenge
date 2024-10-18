import {Component, OnInit, ViewChild} from '@angular/core';
import { createChart } from 'lightweight-charts';

//Modules
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MetricsService} from '../../shared/services/metrics.service';
import {Metric} from '../../shared/types/metric';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,RouterLink, RouterLinkActive],
  providers: [MetricsService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer!: HTMLElement;
  metrics: Array<Metric> = [];
  allItems: Array<{ id: number; name: string }> = [];
  visibleItems: Array<{ id: number; name: string }> = [];
  currentPage = 1;
  itemsPerPage = 5

  constructor(private metricsService: MetricsService) {
  }

  ngOnInit() {
    for (let i = 1; i <= 50; i++) {
      this.allItems.push({ id: i, name: `Item ${i}` });
    }

    this.loadMetrics();
    this.loadMore();
  }

  loadMetrics(){
    this.metricsService.getMetrics().subscribe((metrics: Array<Metric>) => {
      this.metrics = metrics;
    });
  }

  loadMore() {
    const nextItems = this.allItems.slice(this.visibleItems.length, this.visibleItems.length + this.itemsPerPage);
    this.visibleItems.push(...nextItems);
    this.currentPage++;
  }
}
