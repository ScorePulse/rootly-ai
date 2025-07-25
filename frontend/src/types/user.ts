export interface User {
  userId: string;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterPayload extends LoginCredentials {
  name: string;
}
