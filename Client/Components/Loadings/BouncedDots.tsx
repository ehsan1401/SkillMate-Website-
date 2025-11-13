



export function BouncedDots(){
    return(
        <div className="w-10 h-10 flex justify-center items-center gap-2">
            <span className="bg-neutral-600 w-2 h-2 rounded-full drop-bounce"></span>
            <span className="bg-neutral-600 w-2 h-2 rounded-full drop-bounce" style={{ animationDelay: "0.13s" }}></span>
            <span className="bg-neutral-600 w-2 h-2 rounded-full drop-bounce" style={{ animationDelay: "0.15s" }}></span>
        </div>
    )
}