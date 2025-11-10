import { API } from "@/utils/Api";
import { fetcher } from "@/utils/fetcher";

export async function updateUsername(email: string, newUsername: string) {
  try {
    const result = await fetcher(API.setting.updateUsername(), {
      method: 'PATCH',
      body: { email, newUsername },
    });
    return result ;
  } catch (err) {
    console.error(err);
  }
}


export const UserSearchVisibility = async (
  userId: number,
  currentShow: boolean,
  setUserShow: (value: boolean) => void
) => {
  const newShow = !currentShow;
  setUserShow(newShow);

  try {
    const res = await fetch(API.setting.ChangeSearchShow(userId), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showInSearch: newShow }),
    });

    if (!res.ok) {
      console.error("Error updating search visibility");
      setUserShow(!newShow); 
    }
  } catch (error) {
    console.error(error);
    setUserShow(!newShow);
  }
};


