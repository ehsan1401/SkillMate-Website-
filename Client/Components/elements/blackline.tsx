export default function Blackline({size}:{ size? : number}){
     return(<div className={`w-[100%] h-[${size ? size : 2}px] bg-black`}></div>)
}
