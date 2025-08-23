import { Button } from "antd"

type AccessDeniedProps = {
  type: 'Block' | 'Unauthorized' | 'Forbidden',
  Button?: React.ReactNode,
  ButtonHref : string,
}
export default function AccessDenied({type , Button , ButtonHref} : AccessDeniedProps ,  ) {
    return(
        <div
            className="w-screen h-screen bg-cover bg-no-repeat flex flex-col items-center pt-20 bg-center"
            style={{backgroundImage : `url("/Images/Error-AccessDenied.jpg")`}}
        >
            <h1 className="text-9xl text-white font-bold hover:text-red-700 transition-all duration-700 cursor-not-allowed relative" style={{fontFamily:"Vazir"}}>
                {type == "Block" ? 'Bloked!!!' : type==="Unauthorized" ? '401 Unauthorized' : '403 Forbidden'}
                <p className="text-base text-center text-white hover:text-white">
                    {type == "Block" ? 'You are Blocked.' : type==="Unauthorized" ? 'Login required to aceess!' : 'You cant access this page!'}
                </p>
                <div className="text-center w-full -mt-20 cursor-not-allowed">
                    <a href={ButtonHref} className="cursor-pointer">{Button}</a>
                </div>
            </h1>


        </div>
    )
}
