import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserDetails } from '../../model/UserDetails';
import { UserService } from '../../service/user.service';

// 

@Component({
  selector: 'app-usertable',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.scss'
})
export class UsertableComponent implements OnInit {
  users: UserDetails[] = [];
  filteredUsers: UserDetails[] = [];
  selectedUsers: string[] = [];
  allSelected = false;
  
  // Filters
  searchTerm = '';
  statusFilter = 'all';
  roleFilter = 'all';
  
  // Sorting
  sortColumn = 'name';
  sortDirection = 'asc';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private router: Router,private userservice:UserService) { }

  ngOnInit(): void {
    // In a real app, you would fetch users from a service
    this.loadUsers();
  }

  loadUsers(): void {
    // Mock data for demonstration
    this.userservice.getUsersDetails().subscribe((res:any)=>{
      this.users=res.data;
      this.applyFilter();
    })
    // this.users = [
    //   {
    //     id: '1',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john.doe@example.com',
    //     role: 'Admin',
    //     status: 'Active',
    //     lastLogin: new Date('2023-05-15T10:30:00'),
    //     avatar: 'assets/images/avatar-1.jpg'
    //   },
    //   {
    //     id: '2',
    //     firstName: 'Jane',
    //     lastName: 'Smith',
    //     email: 'jane.smith@example.com',
    //     role: 'User',
    //     status: 'Active',
    //     lastLogin: new Date('2023-05-14T14:45:00'),
    //     avatar: 'assets/images/avatar-2.jpg'
    //   },
    //   {
    //     id: '3',
    //     firstName: 'Robert',
    //     lastName: 'Johnson',
    //     email: 'robert.johnson@example.com',
    //     role: 'User',
    //     status: 'Inactive',
    //     lastLogin: new Date('2023-05-10T09:15:00')
    //   },
    //   {
    //     id: '4',
    //     firstName: 'Emily',
    //     lastName: 'Williams',
    //     email: 'emily.williams@example.com',
    //     role: 'Guest',
    //     status: 'Active',
    //     lastLogin: new Date('2023-05-13T16:20:00'),
    //     avatar: 'assets/images/avatar-3.jpg'
    //   },
    //   {
    //     id: '5',
    //     firstName: 'Michael',
    //     lastName: 'Brown',
    //     email: 'michael.brown@example.com',
    //     role: 'Admin',
    //     status: 'Active',
    //     lastLogin: new Date('2023-05-15T08:10:00'),
    //     avatar: 'assets/images/avatar-4.jpg'
    //   }
    // ];
    
    // // Generate more mock data
    // for (let i = 6; i <= 50; i++) {
    //   const roles = ['Admin', 'User', 'Guest'];
    //   const statuses = ['Active', 'Inactive'];
      
    //   this.users.push({
    //     id: i.toString(),
    //     firstName: `FirstName${i}`,
    //     lastName: `LastName${i}`,
    //     email: `user${i}@example.com`,
    //     role: roles[Math.floor(Math.random() * roles.length)],
    //     status: statuses[Math.floor(Math.random() * statuses.length)],
    //     lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000)
    //   });
    // }
    
    
  }

  applyFilter(): void {
    let filtered = [...this.users];
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        user.status.toLowerCase() === this.statusFilter.toLowerCase()
      );
    }
    
    // Apply role filter
    if (this.roleFilter !== 'all') {
      filtered = filtered.filter(user => 
        user.role.toLowerCase() === this.roleFilter.toLowerCase()
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      switch (this.sortColumn) {
        case 'name':
          valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
          valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case 'role':
          valueA = a.role.toLowerCase();
          valueB = b.role.toLowerCase();
          break;
        case 'status':
          valueA = a.status.toLowerCase();
          valueB = b.status.toLowerCase();
          break;
        case 'lastLogin':
          valueA = a.lastLogin.getTime();
          valueB = b.lastLogin.getTime();
          break;
        default:
          valueA = a.id;
          valueB = b.id;
      }
      
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    // Calculate total pages
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredUsers = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.applyFilter();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'fa-sort';
    }
    
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyFilter();
  }

  changePageSize(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    
    if (this.allSelected) {
      this.selectedUsers = this.filteredUsers.map(user => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  toggleSelect(userId: string): void {
    const index = this.selectedUsers.indexOf(userId);
    
    if (index === -1) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
    
    this.allSelected = this.filteredUsers.length > 0 && 
                       this.selectedUsers.length === this.filteredUsers.length;
  }

  isSelected(userId: string): boolean {
    return this.selectedUsers.includes(userId);
  }

  viewDetails(userId: string): void {
    console.log('Navigating to user:', userId);
    if (userId) {
      this.router.navigate(['dashboard/userview', userId]);
    } else {
      console.error('Invalid user ID');
    }
  }

  editUser(userId: string): void {
    this.router.navigate(['/dashboard/edit', userId]);
  }

  deleteUser(userId: string): void {
    // In a real app, you would call a service to delete the user
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting user with ID:', userId);
      
      // Remove from the users array
      this.users = this.users.filter(user => user.id !== userId);
      
      // Remove from selected users if present
      const index = this.selectedUsers.indexOf(userId);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
      
      // Refresh the filtered list
      this.applyFilter();
    }
  }
}