import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserDetails } from '../../model/UserDetails';
import { UserService } from '../../service/user.service';

// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   dateOfBirth?: Date;
//   gender?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zipCode?: string;
//   country?: string;
//   role: string;
//   status: string;
//   createdDate?: Date;
//   lastLogin: Date;
//   avatar?: string;
// }

interface Activity {
  id: string;
  type: 'login' | 'update' | 'create' | 'delete' | 'permission';
  description: string;
  timestamp: Date;
}

@Component({
  selector: 'app-userdetails',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent implements OnInit {
  userId: string;
  user: UserDetails | null = null;
  activityLog: Activity[] = [];
  
  // Country mapping
  countries = {
    'us': 'United States',
    'ca': 'Canada',
    'uk': 'United Kingdom',
    'au': 'Australia'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice:UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    // const userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId)
    if (this.userId) {
      this.loadUserDetails();
      this.loadActivityLog();
    } else {
      // this.router.navigate(['/dashboard/users']);
    }
  }

  loadUserDetails(): void {
    // In a real app, you would fetch user data from a service
    // For demo purposes, we'll use mock data
    // this.user = {
    //   id: this.userId,
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   email: 'john.doe@example.com',
    //   phone: '+1 (555) 123-4567',
    //   dateOfBirth: new Date('1990-01-01'),
    //   gender: 'Male',
    //   address: '123 Main St',
    //   city: 'New York',
    //   state: 'NY',
    //   zipCode: '10001',
    //   country: 'us',
    //   role: 'Admin',
    //   status: 'Active',
    //   createdDate: new Date('2023-01-15'),
    //   lastLogin: new Date('2023-05-15T10:30:00'),
    //   avatar: 'assets/images/avatar-1.jpg'
    // };
    this.userservice.getUsersDetailsbyid(this.userId).subscribe((res:any)=>{
      this.user=res.data;
    })
    

  }

  loadActivityLog(): void {
    // In a real app, you would fetch activity log from a service
    // For demo purposes, we'll use mock data
    this.activityLog = [
      {
        id: '1',
        type: 'login',
        description: 'User logged in successfully',
        timestamp: new Date('2023-05-15T10:30:00')
      },
      {
        id: '2',
        type: 'update',
        description: 'User profile information updated',
        timestamp: new Date('2023-05-10T14:45:00')
      },
      {
        id: '3',
        type: 'permission',
        description: 'User role changed from User to Admin',
        timestamp: new Date('2023-05-01T09:15:00')
      },
      {
        id: '4',
        type: 'login',
        description: 'User logged in successfully',
        timestamp: new Date('2023-04-28T16:20:00')
      },
      {
        id: '5',
        type: 'create',
        description: 'User account created',
        timestamp: new Date('2023-01-15T08:10:00')
      }
    ];
  }

  getCountryName(countryCode?: string): string {
    if (!countryCode) return '';
    return this.countries[countryCode as keyof typeof this.countries] || countryCode;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'login':
        return 'fa-sign-in-alt';
      case 'update':
        return 'fa-edit';
      case 'create':
        return 'fa-plus-circle';
      case 'delete':
        return 'fa-trash-alt';
      case 'permission':
        return 'fa-user-shield';
      default:
        return 'fa-circle';
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/usertable']);
  }

  editUser(): void {
    this.router.navigate(['/dashboard/dit', this.userId]);
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting user with ID:', this.userId);
      this.userservice.delete(this.userId).subscribe((res:any)=>
      {
        alert(res.message)
         this.router.navigate(['/dashboard/usertable']);
      })
      // In a real app, you would call a service to delete the user
     
    }
  }
}