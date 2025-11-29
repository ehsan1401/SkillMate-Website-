import { UserInfo } from "../pages/type"


export default function SocialsMedia(
    { 
        formData, 
        setFormData 
    } 
    : 
    { 
        formData : UserInfo, 
        setFormData: React.Dispatch<React.SetStateAction<UserInfo>> 
    }
){
    return(
        <div className="w-full h-[450px]">
            {/* <input
                type="tel"
                placeholder="Phone Number"
                className="border p-2 rounded"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            /> */}

        </div>
    )
}