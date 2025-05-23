import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ButtonLoaderComponent } from '../../loaders/button-loader/button-loader.component';
import { LoaderService } from '../../service/loader.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-usersign',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonLoaderComponent],
  templateUrl: './usersign.component.html',
  styleUrl: './usersign.component.scss'
})
export class UsersignComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  showPassword = false;
  isLoading: false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loader: LoaderService,
    private authService: SocialAuthService,

  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  get f() { return this.signinForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.loader.startLoader()
    console.log(this.isLoading)
    this.submitted = true;

    // Stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }


    // Process signin logic here
    console.log('Form submitted:', this.signinForm.value);


    this.auth.signin(this.signinForm.value).subscribe((res: any) => {
      this.loader.stopLoader()
      alert(res.message)
      localStorage.setItem('name', res.data.username)
      localStorage.setItem('email', res.data.email)
      localStorage.setItem('token', res.data.token)
      this.router.navigate(['/dashboard']);
    })
    // Navigate to dashboard after successful signin

  }

  //  loginWithGoogle() {
  //   console.log('user')
  //     // Trigger Google login popup
  //  this.authService.authState.subscribe((user: SocialUser | null) => {
  //   if (user) {
  //     console.log(user.idToken);
  //   }
  // });
  //   }

  loginWithGoogle() {
    const redirectUrl = 'https://applicationclient.netlify.app/auth/callback'; // Must match your Appwrite config
    this.auth.loginWithOAuth('google', redirectUrl, redirectUrl);
  }
}