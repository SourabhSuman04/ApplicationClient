import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoaderComponent } from '../loaders/loader/loader.component';
import { LoaderService } from '../service/loader.service';
import { DashboardLoaderComponent } from '../loaders/dashboard-loader/dashboard-loader.component';
import { ChatComponent } from "../ChatPage/chat/chat.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterOutlet, SidebarComponent, LoaderComponent, DashboardLoaderComponent, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed = false;
  currentPage = 'Dashboard';
  isLoading=false
  constructor(private router: Router,private loader:LoaderService) {}

  ngOnInit(): void {
    this.loader.startLoader();
    // Update current page title based on route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loader.stopLoader();
      const currentRoute = this.router.url.split('/').pop() || 'dashboard';
      this.currentPage = this.capitalizeFirstLetter(currentRoute);
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}