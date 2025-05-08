import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { user } from '../../../model/users';


@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  showPassword = false;
  data: any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

 
  get f() { return this.signinForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    
    console.log('Form submitted:', this.signinForm.value);
    const userdata=this.signinForm.value;
    if(userdata!=null)
    {
    this.onLogin(userdata)
    }else{ 
       this.router.navigate(['/signin']);
    }
   
  }


  onLogin(model: any) {
    this.auth.Login(model).subscribe((res: any) => {
      this.data = res.data;
      if(res.isSuccess)
        {

          localStorage.setItem('name',res.data.username);
          localStorage.setItem('email',res.data.email)
          localStorage.setItem('token',res.data.token);
            alert(res.message)
            this.router.navigate(['/dashboard']);

        }else
        {
          alert(res.message)
        }

    })
  }
}