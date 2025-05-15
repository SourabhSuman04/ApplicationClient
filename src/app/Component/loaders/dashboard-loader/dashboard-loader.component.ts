import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-dashboard-loader',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard-loader.component.html',
  styleUrl: './dashboard-loader.component.scss'
})
export class DashboardLoaderComponent {
  @Input() fullScreen = true;
  @Input() text = 'Loading dashboard...';
  @Input() showLogo = true;
   isLoading: false;

  constructor(private loader: LoaderService) {
    this.loader.isLoading.subscribe((res: any) => {
      this.isLoading = res;
    })
  }
}
