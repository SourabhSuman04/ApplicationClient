import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbutton',
imports:[CommonModule],
  standalone:true,
  templateUrl: './chatbutton.component.html',
  styleUrl: './chatbutton.component.scss'
})
export class ChatbuttonComponent {
  @Input() isOpen = false;
  @Input() hasUnreadMessages = false;
  @Output() toggle = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }
}
