import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailsService } from '../../../service/userdetails.service';

@Component({
  selector: 'app-user-details-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-details-form.component.html',
  styleUrl: './user-details-form.component.scss'
})
export class UserDetailsFormComponent implements OnInit {
 userId: any;
  userForm: FormGroup;
  resdata:any;
  submitted = false;
  isEditMode = false;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userdeatis: UserdetailsService
  ) { }

  ngOnInit(): void {
    this.initForm();
   this.userId= this.route.snapshot.paramMap.get('id') || '';
console.log('id:',this.userId)
    this.isEditMode = !!this.userId;


    if (this.isEditMode) {
      this.loadUserData(this.userId);
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      role: ['user', Validators.required],
      status: ['Active', Validators.required],
      // imageId:['',Validators.required],
      imageurl:['tyu',Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  loadUserData(userId: string): void {

  this.userdeatis.getuserdetailsbyid(userId).subscribe((result:any)=>{
    this.resdata=result.data;
    console.log(this.resdata)
    const mockUser = {
  
      firstName: this.resdata.firstName,
      lastName: this.resdata.lastName,
      email: this.resdata.email,
      phone: this.resdata.phone,
      dateOfBirth: this.resdata.dateOfBirth.split('T')[0],
      gender: this.resdata.gender,
      address: this.resdata.address,
      city: this.resdata.city,
      state: this.resdata.state,
      zipCode: this.resdata.zipCode,
      country: this.resdata.country
    };
       this.userForm.patchValue(mockUser);
  })  

  
  }

  // onSubmit(): void {
  //   this.submitted = true;

  //  this.userForm.value.file=this.selectedFile
  //   if (this.userForm.invalid) {
  //     return;
  //   }

  //   const result=this.userForm.value
  //   console.log('Form submitted:', this.userForm.value);

  //   this.userdeatis.addorupdate( this.userForm.value).subscribe((res: any) => {
  //     if (res.isSuccess) {
  //       alert(res.message)
  //       this.router.navigate(['/dashboard/users']);
  //     }
  //     else {
  //       alert(res.message)
  //     }
  //   })

  //   if (this.isEditMode) {

  //     console.log('Updating user with ID:', this.userId);
  //   } else {

  //     console.log('Creating new user');
  //   }

  // }
  onSubmit(): void {
    this.submitted = true;
  
    if (!this.selectedFile) {
      alert("File not selected.");
      return;
    }
    if (this.userForm.invalid || !this.selectedFile) {
      alert("Form is invalid or file not selected.");
      return;
    }
  
    const formData = new FormData();
  
    // Append form fields (except file)
    for (const key in this.userForm.value) {
      if (key !== 'file') {
        formData.append(key, this.userForm.value[key]);
      }
    }
  
    // Append the file (this must match 'File' in your .NET DTO)
    formData.append('File', this.selectedFile);
  
    this.userdeatis.addorupdate(formData).subscribe((res: any) => {
      if (res.isSuccess) {
        alert(res.message);
        this.router.navigate(['/dashboard/users']);
      } else {
        alert(res.message);
      }
    });
  }
  

  onCancel(): void {
    // Navigate back to users list
    this.router.navigate(['/dashboard/users']);
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //   }
  // }

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log('Selected file:', this.selectedFile);
  }
}

}