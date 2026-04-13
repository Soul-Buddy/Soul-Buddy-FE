export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Session {
  user: User;
  expires: string;
}
