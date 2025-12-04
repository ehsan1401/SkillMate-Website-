import { GetPeopleInfoType } from "./types"


export async function GetPeopleInformation(url : string) {
    const result =await fetch(url , {
        method : "Get",
        cache: "force-cache",
        next : {revalidate : 60}
    })
    const data : GetPeopleInfoType[] = await result.json()
    return data[0] ;
}