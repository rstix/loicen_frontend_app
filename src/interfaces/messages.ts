export interface Messages {
  id: string;
  text: string;
  status: string;
  dislike?: boolean;
  feedback?: string;
}

export interface Sources {
  id: string;
  file_id: string;
  base_name: string;
  score?: number;
  title: string;
  metadata_keywords?: string[];
  relevant: boolean;
}
