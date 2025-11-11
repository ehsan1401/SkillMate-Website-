
type userValue = {
    email : boolean, 
    profileImageUrl : boolean,
    ShowInSearch : boolean ,
    phone : boolean ,
    dateofbirth : boolean,
    bio : boolean ,
    social : boolean ,
    skills : boolean,
    learning_skills : boolean,
    resume : boolean
}
type ProfileCompletionResult = {
    Percentage: number;
    NotCompleted: { key: string; value: boolean }[];
}

export function ProfileCompletePercentage( userValues : userValue) : ProfileCompletionResult {

    const entries = Object.entries(userValues)
    const NotCompleted = entries.reduce((acc , [key , value]) =>{
        if(!value){
            acc.push({key , value})
        }
        return acc;
    } , [] as {key : string , value : boolean}[])

    const Percentage = ((entries.length - NotCompleted.length ) / entries.length ) * 100

    return {Percentage , NotCompleted} ;
}