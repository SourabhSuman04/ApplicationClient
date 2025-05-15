import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { LoaderService } from '../../service/loader.service';
import { ButtonLoaderComponent } from '../../loaders/button-loader/button-loader.component';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-usersignup',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,ButtonLoaderComponent],
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.scss'
})
export class UsersignupComponent  implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  showPassword = false;
  isLoading=false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth:AuthService,
    private loader:LoaderService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.signupForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loader.startLoader();

    if (this.signupForm.invalid) {
      return;
    }

    console.log('Form submitted:', this.signupForm.value);
    
    this.auth.signup(this.signupForm.value).subscribe((res:any)=>{
      this.loader.stopLoader()
      alert(res.message)
      this.router.navigate(['signin']);
    })


  }
}