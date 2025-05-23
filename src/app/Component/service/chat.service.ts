import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'typing' | 'quick-reply';
  quickReplies?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private isTypingSubject = new BehaviorSubject<boolean>(false);
  public isTyping$ = this.isTypingSubject.asObservable();

  private aiResponses = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      responses: [
        "Hello! I'm your dashboard assistant. How can I help you today?",
        "Hi there! I'm here to help you navigate your dashboard. What would you like to know?",
        "Hey! Welcome to your dashboard. I can help you with analytics, user management, or any questions you have."
      ]
    },
    {
      keywords: ['help', 'support', 'assist'],
      responses: [
        "I'm here to help! I can assist you with:\n• Dashboard navigation\n• Analytics insights\n• User management\n• Settings configuration\n• Troubleshooting\n\nWhat specific area would you like help with?"
      ]
    },
    {
      keywords: ['analytics', 'data', 'stats', 'metrics'],
      responses: [
        "I can help you understand your analytics! Your dashboard shows:\n• User engagement metrics\n• Performance indicators\n• Growth trends\n• Revenue analytics\n\nWould you like me to explain any specific metric?"
      ]
    },
    {
      keywords: ['users', 'user management', 'accounts'],
      responses: [
        "For user management, you can:\n• View all users in the Users section\n• Add new users with the 'Add User' button\n• Edit user details by clicking the edit icon\n• Manage user roles and permissions\n\nNeed help with any specific user management task?"
      ]
    },
    {
      keywords: ['settings', 'configuration', 'setup'],
      responses: [
        "You can access settings from the sidebar menu. Available options include:\n• Profile settings\n• Security preferences\n• Notification settings\n• Theme customization\n• Integration settings\n\nWhat would you like to configure?"
      ]
    },
    {
      keywords: ['export', 'download', 'report'],
      responses: [
        "You can export data from various sections:\n• Analytics reports (PDF/Excel)\n• User lists (CSV)\n• Activity logs\n• Custom reports\n\nWhich data would you like to export?"
      ]
    }
  ];

  private quickReplies = [
    "Show me analytics",
    "How to add users?",
    "Export data",
    "Dashboard tour",
    "Contact support"
  ];

  constructor() {
    // Initialize with welcome message
    this.addWelcomeMessage();
  }

  private addWelcomeMessage(): void {
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      content: "👋 Welcome to your dashboard assistant! I'm here to help you navigate and make the most of your dashboard. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'quick-reply',
      quickReplies: this.quickReplies
    };
    
    this.messagesSubject.next([welcomeMessage]);
  }

  sendMessage(content: string): Observable<ChatMessage> {
    const userMessage: ChatMessage = {
      id: this.generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Add user message
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMessage]);

    // Show typing indicator
    this.isTypingSubject.next(true);

    // Generate AI response
    return this.generateAIResponse(content).pipe(
      delay(Math.random() * 1000 + 1000) // Random delay between 1-2 seconds
    );
  }

  private generateAIResponse(userMessage: string): Observable<ChatMessage> {
    const lowerMessage = userMessage.toLowerCase();
    let response = "I understand you're asking about that. Let me help you find the right information. Could you be more specific about what you're looking for?";
    let quickReplies: string[] = [];

    // Find matching response
    for (const aiResponse of this.aiResponses) {
      if (aiResponse.keywords.some(keyword => lowerMessage.includes(keyword))) {
        response = aiResponse.responses[Math.floor(Math.random() * aiResponse.responses.length)];
        break;
      }
    }

    // Add contextual quick replies
    if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
      quickReplies = ["Show revenue trends", "User engagement", "Export analytics"];
    } else if (lowerMessage.includes('user')) {
      quickReplies = ["Add new user", "User permissions", "View user list"];
    } else if (lowerMessage.includes('help')) {
      quickReplies = ["Dashboard tour", "Video tutorials", "Contact support"];
    } else {
      quickReplies = this.quickReplies;
    }

    const aiMessage: ChatMessage = {
      id: this.generateId(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      type: 'quick-reply',
      quickReplies
    };

    return of(aiMessage);
  }

  addAIMessage(message: ChatMessage): void {
    this.isTypingSubject.next(false);
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearChat(): void {
    this.messagesSubject.next([]);
    this.addWelcomeMessage();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
