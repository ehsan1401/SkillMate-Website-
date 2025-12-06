import { useState } from "react";



export function useTest(){
    const fffn = Array.from({length : 20} , (_ , index)=> 5 + index)
    const something = fffn.reduce((acc , cur)=>{
        acc += cur ;
        console.log(acc)
        return acc;
    } , 0)
    const [test , setTest] = useState({
        log  : "Ahmad Mohsen!" ,
        logAgain : something
    })

    return { test , setTest} ; 
}
