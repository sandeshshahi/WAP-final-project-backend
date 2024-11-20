export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  votes?: number;
  user_id: number;
  name?: string;
}
