import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLoaderComponent } from './Component/loaders/dashboard-loader/dashboard-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DashboardLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Application';
}
