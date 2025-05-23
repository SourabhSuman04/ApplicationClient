import { Component, ElementRef, OnDestroy, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatMessage, ChatService } from '../../service/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatinterface',
  imports:[CommonModule,FormsModule],
  standalone:true,
  templateUrl: './chatinterface.component.html',
  styleUrl: './chatinterface.component.scss'
})
export class ChatinterfaceComponent  implements OnInit, OnDestroy {
trackByMessageId: TrackByFunction<ChatMessage>;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  isTyping = false;
  newMessage = '';
  isMinimized = false;
  
  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        setTimeout(() => this.scrollToBottom(), 100);
      });

    this.chatService.isTyping$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isTyping => {
        this.isTyping = isTyping;
        if (isTyping) {
          setTimeout(() => this.scrollToBottom(), 100);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = this.newMessage.trim();
      this.newMessage = '';
      
      this.chatService.sendMessage(message).subscribe(aiResponse => {
        this.chatService.addAIMessage(aiResponse);
      });
    }
  }

  sendQuickReply(reply: string): void {
    this.chatService.sendMessage(reply).subscribe(aiResponse => {
      this.chatService.addAIMessage(aiResponse);
    });
  }


formatMessage(message: string): string {
  // Simple example: convert URLs to anchor tags
  const urlRegex = /((https?:\/\/[^\s]+))/g;
  return message.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.chatService.clearChat();
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }

  focusInput(): void {
    setTimeout(() => {
      if (this.messageInput) {
        this.messageInput.nativeElement.focus();
      }
    }, 100);
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

}
