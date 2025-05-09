import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-usersign',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './usersign.component.html',
  styleUrl: './usersign.component.scss'
})
export class UsersignComponent  implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }


    // Process signin logic here
    console.log('Form submitted:', this.signinForm.value);


    this.auth.signin(this.signinForm.value).subscribe((res:any)=>{
      alert(res.message)
      localStorage.setItem('name',res.data.username)
      localStorage.setItem('email',res.data.email)
      localStorage.setItem('token',res.data.token)
       this.router.navigate(['/dashboard']);
    })
    // Navigate to dashboard after successful signin
   
  }
}