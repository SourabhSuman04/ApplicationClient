import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  emailSent = false;

  constructor(private formBuilder: FormBuilder,private authservice:AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required]]
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    console.log('Form submitted:', this.forgotPasswordForm.value);

    this.emailSent = true;
  }
}