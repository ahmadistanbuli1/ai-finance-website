export interface DbUser {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface AuthSyncResponse {
  user: DbUser;
}
