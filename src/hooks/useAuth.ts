import { getSession } from "@/services/user/user.services";
import { useQuery } from "@tanstack/react-query";


interface UserSession{
  id: string;
  email: string;
  name: string;
  role: string;
  image: string | null;
  phone: string | null;
  emailVerified: boolean;
  status: "ban" | "unban";
  createdAt: Date;
  updatedAt: Date;
}

export default function useAuth() {
  return useQuery<{ data: UserSession | null, error: string | null } | undefined>({
    queryKey: ["auth"],
    queryFn: async (): Promise<{ data: UserSession | null, error: string | null } | undefined> => {
      const session = await getSession();
      if (!session.error) {
        return { data: session.data as UserSession, error: null };
      }
      return { data: null, error: session.error };
    }
  });       
}