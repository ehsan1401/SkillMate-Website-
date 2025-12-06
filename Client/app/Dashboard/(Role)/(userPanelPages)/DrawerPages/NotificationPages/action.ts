import { API } from "@/utils/Api";

export async function AcceptSyncUserToAnother(ConnectionID: number , NotifId : number) {
  const res = await fetch(API.Connections.AcceptSyncConnection(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      ConnectionID: ConnectionID,
      NotifId: NotifId
    })
  });

  if (!res.ok) {
    console.log(Error , `${res.statusText}`)
  }

    const data = await res.json()
  return data;
}