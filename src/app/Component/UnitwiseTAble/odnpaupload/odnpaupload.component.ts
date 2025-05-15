import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../service/loader.service';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enivironment/environmentr';
import { ButtonLoaderComponent } from '../../loaders/button-loader/button-loader.component';
import { LoaderComponent } from '../../loaders/loader/loader.component';

@Component({
  selector: 'app-odnpaupload',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ButtonLoaderComponent],
  templateUrl: './odnpaupload.component.html',
  styleUrl: './odnpaupload.component.scss'
})
export class OdnpauploadComponent {

 selectedFile: File | null = null;
isLoading: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loader:LoaderService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
   
  }


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


upload() {
  this.loader.startLoader();
  if (!this.selectedFile) {
    alert('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);
  console.log(formData)
  this.http.post(environment.baseurl+"UnitWise/upload-odnpa-excel", formData).subscribe({
    next: (res) => {
      this.loader.stopLoader();
      alert('Upload successful')},
    error: (err) => console.error('Upload failed', err),
  });

}
}
