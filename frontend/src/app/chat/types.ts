export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  flagged?: boolean;
}

export interface Challenge {
  title: string;
  description: string;
}

