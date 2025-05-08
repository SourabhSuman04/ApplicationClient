import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Userdetails } from '../../../model/userdetails';
import { UserdetailsService } from '../../../service/userdetails.service';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {

users: Userdetails[] = [];
filteredUsers: Userdetails[] = [];
selectedUsers: string[] = [];
allSelected = false;

searchTerm = '';
statusFilter = 'all';
roleFilter = 'all';

sortColumn: keyof Userdetails | 'name' | 'lastLogin' = 'name';
sortDirection: 'asc' | 'desc' = 'asc';

currentPage = 1;
pageSize = 10;
totalPages = 1;

constructor(private router: Router, private userdetails: UserdetailsService) {}

ngOnInit(): void {
  this.loadUsers();
}

loadUsers(): void {

  this.userdetails.getuserdetails().subscribe((res: any) => {

    
    this.users = res.data || [];
    console.log("dsdfgh",this.users)
    this.applyFilter();
  });
}

applyFilter(): void {
  let filtered = [...this.users];

  if (this.searchTerm.trim()) {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  }

  if (this.statusFilter !== 'all') {
    filtered = filtered.filter(user => user.status?.toLowerCase() === this.statusFilter.toLowerCase());
  }

  if (this.roleFilter !== 'all') {
    filtered = filtered.filter(user => user.role?.toLowerCase() === this.roleFilter.toLowerCase());
  }

  this.sortUsers(filtered);
  this.totalPages = Math.ceil(filtered.length / this.pageSize);
  const start = (this.currentPage - 1) * this.pageSize;
  this.filteredUsers = filtered.slice(start, start + this.pageSize);
  this.syncSelection();
}

sortUsers(users: Userdetails[]): void {
  users.sort((a, b) => {
    let valA: string | number;
    let valB: string | number;

    if (this.sortColumn === 'name') {
      valA = `${a.firstName} ${a.lastName}`.toLowerCase();
      valB = `${b.firstName} ${b.lastName}`.toLowerCase();
    } else if (this.sortColumn === 'lastLogin') {
      valA = new Date(a.lastLogin || '').getTime();
      valB = new Date(b.lastLogin || '').getTime();
    } else {
      valA = (a[this.sortColumn] || '').toString().toLowerCase();
      valB = (b[this.sortColumn] || '').toString().toLowerCase();
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return this.sortDirection === 'asc' ? valA - valB : valB - valA;
    } else {
      return this.sortDirection === 'asc'
        ? (valA as string).localeCompare(valB as string)
        : (valB as string).localeCompare(valA as string);
    }
  });
}

getPageNumbers(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

changePage(page: number): void {
  this.currentPage = page;
  this.applyFilter();
}

changePageSize(): void {
  this.currentPage = 1;
  this.applyFilter();
}

toggleSelectAll(): void {
  this.allSelected = !this.allSelected;
  if (this.allSelected) {
    this.selectedUsers = this.filteredUsers.map(user => user.id);
  } else {
    this.selectedUsers = [];
  }
}

toggleSelect(userId: any): void {
  const index = this.selectedUsers.indexOf(userId);
  if (index === -1) {
    this.selectedUsers.push(userId);
  } else {
    this.selectedUsers.splice(index, 1);
  }
  this.syncAllSelected();
}

isSelected(userId: any): boolean {
  return this.selectedUsers.includes(userId);
}

syncAllSelected(): void {
  this.allSelected = this.filteredUsers.length > 0 &&
    this.filteredUsers.every(user => this.selectedUsers.includes(user.id));
}

syncSelection(): void {
  this.syncAllSelected();
}

sortBy(column: keyof Userdetails | 'name' | 'lastLogin'): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
  this.applyFilter();
}

getSortIcon(column: string): string {
  if (this.sortColumn !== column) return 'fa-sort';
  return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
}

viewDetails(userId: any): void {
  this.router.navigate(['/dashboard/users/view', userId]);
}

editUser(userId: any): void {
  this.router.navigate(['/dashboard/users/edit', userId]);
}

adduser(): void {
  this.router.navigate(['/dashboard/add-user']);
}

deleteUser(userId: any): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.userdetails.delete(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
}