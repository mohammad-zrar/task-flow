export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  role: Role;
};

export type LoginResponse = {
  token: string;
  expires_at: string;
};

export type Task = {
  id: number;
  title: string;
  completed: boolean;
}