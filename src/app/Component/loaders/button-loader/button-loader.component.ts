import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-button-loader',
  imports: [CommonModule,FormsModule],
  templateUrl: './button-loader.component.html',
  styleUrl: './button-loader.component.scss'
})
export class ButtonLoaderComponent {
  @Input() color: 'light' | 'dark' = 'light';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

   isLoading: false;

  constructor(private loader: LoaderService) {
    this.loader.isLoading.subscribe((res: any) => {
      this.isLoading = res;
    })
  }
}
