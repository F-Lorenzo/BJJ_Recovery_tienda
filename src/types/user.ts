export interface User {
  id: string;
  databaseId: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthPayload {
  authToken: string;
  refreshToken: string;
  user: User;
}
