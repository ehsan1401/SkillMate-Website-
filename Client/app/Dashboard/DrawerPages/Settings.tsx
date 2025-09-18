import DarkModeToggle from "@/Components/elements/DarkModeToggle";

export default function Settings(){
    return(
        <div className="p-5 w-full h-full select-none">
            <h1 className="text-5xl text-neutral-950 dark:text-neutral-50" style={{fontFamily:"scriptMtbold"}}> 
                Settings
            </h1>

            <div>
                <DarkModeToggle/>
            </div>
        </div>
    )
}