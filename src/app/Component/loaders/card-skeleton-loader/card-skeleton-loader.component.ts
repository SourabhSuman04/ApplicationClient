import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-card-skeleton-loader',
  imports: [CommonModule,FormsModule],
  templateUrl: './card-skeleton-loader.component.html',
  styleUrl: './card-skeleton-loader.component.scss'
})
export class CardSkeletonLoaderComponent {
  @Input() type: 'stat' | 'chart' | 'table' | 'profile' = 'stat';

   isLoading: false;

  constructor(private loader: LoaderService) {
    this.loader.isLoading.subscribe((res: any) => {
      this.isLoading = res;
    })
  }
}
