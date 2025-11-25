import { GetPeopleInfoType } from "./types"


export async function GetPeopleInformation(url : string) {
    console.log(url)
    const result =await fetch(url , {
        method : "Get",
        cache: "no-cache"
    })
    const data : GetPeopleInfoType[] = await result.json()
    return data[0] ;
}