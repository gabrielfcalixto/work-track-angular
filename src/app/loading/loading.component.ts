import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
      <p-progressSpinner strokeWidth="4"></p-progressSpinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
