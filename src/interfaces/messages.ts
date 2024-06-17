export interface Messages {
  isUser: boolean;
  text: string;
  sources: Sources[];
}

export interface Sources {
  score: number;
  title: string;
}
