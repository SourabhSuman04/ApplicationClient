import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogComponent } from '../helper/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    constructor(private dialog: MatDialog) {}

  alert(message: string): Promise<void> {
    return firstValueFrom(
      this.dialog.open(DialogComponent, {
        data: { message, type: 'alert' },
        disableClose: true,
      }).afterClosed()
    );
  }

  confirm(message: string): Promise<boolean> {
    return firstValueFrom(
      this.dialog.open(DialogComponent, {
        data: { message, type: 'confirm' },
        disableClose: true,
      }).afterClosed()
    );
  }
}


