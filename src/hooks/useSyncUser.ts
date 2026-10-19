import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const AUTH_QUERY_KEY = "auth-user";

export const useSyncUser = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const query = useQuery({
    queryKey: [AUTH_QUERY_KEY, user?.id],
    queryFn: authService.syncUser,
    enabled: Boolean(isLoaded && isSignedIn && user),
    staleTime: Infinity,
  });

  const isSyncing = query.isPending && query.fetchStatus !== "idle";

  return {
    clerkUser: user,
    dbUser: query.data?.user ?? null,
    isLoaded,
    isSignedIn,
    isSyncing,
    isError: query.isError,
  };
};
