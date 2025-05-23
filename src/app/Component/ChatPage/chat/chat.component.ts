import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { slideInOut } from '../../helper/chat-animation';
import { ChatbuttonComponent } from '../chatbutton/chatbutton.component';
import { ChatinterfaceComponent } from '../chatinterface/chatinterface.component';

@Component({
  selector: 'app-chat',
  imports:[CommonModule,ChatbuttonComponent,ChatinterfaceComponent],
  standalone:true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  isChatOpen = false;
  hasUnreadMessages = false;

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    
    if (this.isChatOpen) {
      this.hasUnreadMessages = false;
    }
  }

  formatMessage(content: string): string {
    // Convert line breaks to HTML
    return content.replace(/\n/g, '<br>');
  }

  trackByMessageId(index: number, message: any): string {
    return message.id;
  }
}
