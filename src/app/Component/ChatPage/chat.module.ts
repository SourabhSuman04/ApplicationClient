import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatService } from '../service/chat.service';
import { ChatComponent } from './chat/chat.component';
import { ChatbuttonComponent } from './chatbutton/chatbutton.component';
import { ChatinterfaceComponent } from './chatinterface/chatinterface.component';



@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
       ChatComponent,

        ChatbuttonComponent,
    ChatinterfaceComponent
  ],
  providers: [
    ChatService
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }