import { API } from "@/utils/Api";
import { fetcher } from "@/utils/fetcher";

export async function updateUsername(email: string, newUsername: string) {
  try {
    const result = await fetcher(API.user.updateUsername(), {
      method: 'PATCH',
      body: { email, newUsername },
    });
    return result ;
  } catch (err) {
    console.error(err);
  }
}
