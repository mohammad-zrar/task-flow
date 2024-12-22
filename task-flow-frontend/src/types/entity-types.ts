export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  role: Role;
};

export type Token = {
  accessToken: {
    name: string;
    abilities: string[];
    expires_at: string;
    tokenable_id: number;
    tokenable_type: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  plainTextToken: string;
};