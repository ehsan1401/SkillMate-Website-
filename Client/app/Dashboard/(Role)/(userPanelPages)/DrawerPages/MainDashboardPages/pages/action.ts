import { ProfileCompletePercentage } from "@/Components/tools/ProfileCompletePercentage";


export async function GetProfileCompletePercentage( url :string ){
    const retult = await fetch(url , {
        method : "GET",
        cache : "no-store"
    })
    const data = await retult.json();
    
    const userValue = ProfileCompletePercentage(data)

    return userValue;
}