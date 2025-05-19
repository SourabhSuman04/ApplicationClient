import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule,FormsModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private appwriteService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.appwriteService.getUser();
    console.log("dsnksjdk")
    if (user) {
      console.log('Logged in as:', user);
      this.router.navigate(['/dashboard']); // or wherever you want
    } else {
      this.router.navigate(['/login']);
    }
  }
}
