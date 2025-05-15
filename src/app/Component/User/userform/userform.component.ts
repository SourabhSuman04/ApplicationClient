import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ButtonLoaderComponent } from '../../loaders/button-loader/button-loader.component';
import { LoaderComponent } from '../../loaders/loader/loader.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-userform',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ButtonLoaderComponent,LoaderComponent],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent implements OnInit {
  @Input() userId: string;
  userForm: FormGroup;
  submitted = false;
  isSubmitting=false
  isEditMode = false;
  selectedFile: File | null = null;
  uploadProgress: number;
  isLoading: false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.loadUserData(this.userId);
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      role: ['User', Validators.required],
      status: ['Active', Validators.required],
      imageurl:['www',Validators.required]
      // 'file' field not used in form binding directly
    });
  }

  get f() {
    return this.userForm.controls;
  }

  loadUserData(userId: string): void {
    this.loader.startLoader()
    this.userservice.getUsersDetailsbyid(userId).subscribe((res: any) => {
      this.loader.stopLoader()
      const user = res.data;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        country: user.country,
        role: user.role,
        status: user.status
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.loader.startLoader();
    this.submitted = true;

    if (this.userForm.invalid || !this.selectedFile) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    const formData = new FormData();

    // Append all form fields
    Object.keys(this.userForm.controls).forEach(key => {
      formData.append(key, this.userForm.get(key)?.value);
    });

    // Append ID for update
    if (this.isEditMode) {
      formData.append("id", this.userId);
    }

    // Append file
    formData.append("file", this.selectedFile);

    console.log(formData)
    // Call service
    this.userservice.Addorupdate(formData).subscribe(
      (res: any) => {
        this.loader.stopLoader();
        alert(res.message);
        this.router.navigate(['/dashboard/usertable']);
      },
      err => {
        console.error(err);
        alert("Something went wrong.");
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/users']);
  }
}