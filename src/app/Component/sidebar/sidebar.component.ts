import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  username=localStorage.getItem('name');
  email=localStorage.getItem('email');
  
  currentRoute = 'dashboard';
  
  navigationItems: NavItem[] = [
    { label: 'home', route: 'home', icon: 'fas fa-shopping-cart' },
    { label: 'Dashboard', route: 'dashboardhome', icon: 'fas fa-th-large' },
    { label: 'Users', route: 'usertable', icon: 'fas fa-users' },
   
    { label: 'Analytics', route: 'unitwise', icon: 'fas fa-chart-bar' },
    { label: 'Settings', route: 'settings', icon: 'fas fa-cog' }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Track current route for active menu highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.url.split('/').pop() || 'dashboard';
      this.currentRoute = route;
    });
  }
  
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  navigateTo(route: string): void {
    this.router.navigate(['/dashboard', route]);
  }

  logout()
  {
    confirm('Are You Sure?');
    localStorage.clear();
    this.router.navigate(['signin'])
  }

}