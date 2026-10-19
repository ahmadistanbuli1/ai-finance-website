import { AuthSyncResponse } from "@/types/auth.types";

export const authService = {
  syncUser: async (): Promise<AuthSyncResponse> => {
    const response = await fetch("/api/auth");

    if (!response.ok) {
      throw new Error(`Auth sync failed with status: ${response.status}`);
    }

    return response.json();
  },
};
