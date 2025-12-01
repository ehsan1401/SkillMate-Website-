import { HeaderImagesType } from "../../pages/type";


export default function Header({
  HeaderImage,
  setHeaderImage,
}: {
  HeaderImage: HeaderImagesType;
  setHeaderImage: React.Dispatch<React.SetStateAction<HeaderImagesType>>;
}){
    const HeaderImages : HeaderImagesType[] = [
        {
            headerName : "Header1" ,
            headerURL : "/Headers/Header1.gif",
            headerALT : "Header1"
        },
        {
            headerName : "Header2" ,
            headerURL : "/Headers/Header2.gif",
            headerALT : "Header2"
        },
        {
            headerName : "Header3" ,
            headerURL : "/Headers/Header3.gif",
            headerALT : "Header3"
        },
        {
            headerName : "Header4" ,
            headerURL : "/Headers/Header4.gif",
            headerALT : "Header4"
        },
        {
            headerName : "Header5" ,
            headerURL : "/Headers/Header5.gif",
            headerALT : "Header5"
        },
        {
            headerName : "Header6" ,
            headerURL : "/Headers/Header6.gif",
            headerALT : "Header6"
        },
        {
            headerName : "Header7" ,
            headerURL : "/Headers/Header7.gif",
            headerALT : "Header7"
        },
        {
            headerName : "Header8" ,
            headerURL : "/Headers/Header8.gif",
            headerALT : "Header8"
        },
        {
            headerName : "Header9" ,
            headerURL : "/Headers/Header9.gif",
            headerALT : "Header9"
        }
    ]
    return(
        <div className="grid grid-cols-3 gap-3 px-5">
            {
                HeaderImages.map((header : HeaderImagesType)=>{
                    return(
                        <div
                            className={`w-[190px] h-[100px] bg-cover bg-center rounded-lg shadow-lg ${header.headerName === HeaderImage.headerName ? ` border-[3px] border-solid border-blue-500` : `cursor-pointer`}`} 
                            style={{backgroundImage : `url(${header.headerURL})`}}
                            onClick={()=>{header.headerName === HeaderImage.headerName ? null : setHeaderImage(header)}}
                            key={header.headerALT}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
}