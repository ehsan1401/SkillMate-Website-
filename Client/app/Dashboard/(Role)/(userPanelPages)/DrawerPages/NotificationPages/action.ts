import { API } from "@/utils/Api";

export async function AcceptSyncUserToAnother(ConnectionID: number , NotifId : number) {
console.log(ConnectionID , NotifId)
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
    console.log(data)
  return data;
}