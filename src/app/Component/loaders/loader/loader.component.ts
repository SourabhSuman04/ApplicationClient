import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loader',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() type: 'pulse' | 'spinner' | 'dots' | 'progress' | 'skeleton' = 'pulse';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'light' = 'primary';
  @Input() fullScreen = false;
  @Input() text = '';
  @Input() progress = 0;
}
