'use client'

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type Suggeste = {
    profileURL: string,
    name : string , 
    skills : string[],
}

export default function ProtectedDataButton() {

    const Suggestes : Suggeste[] = [
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
            name : "John Wick" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOZY7Pr9nMm5Ev1ykgFkD6A1u6p7aiZfpuZ5dUU5j3bENgLbtqIjNAiY2JG9GiBWvVGY&usqp=CAU",
            name : "Billy Forger" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://media.licdn.com/dms/image/v2/D4E03AQEyMNcR8Zvk9g/profile-displayphoto-shrink_400_400/B4EZQckdREHgAg-/0/1735646113112?e=2147483647&v=beta&t=_ATONMcbGg3Z0p_lZPAwNWCktLJ7j1CvBr5G2dakr6I",
            name : "Random Girl" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3ngiKS0US40aYzurZP62I20phqRbO3SEtxCvrVvfV6SzH37jWG_rvgZwJKJ10u3zi78&usqp=CAU",
            name : "Random Boy" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },

    ]
  return (

    // <div className="animate-pulse w-72 bg-gray-300 h-72 rounded-xl"></div>
      <div className="w-full h-full">
        <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            direction="horizontal"
        >
            {Suggestes.map((person: Suggeste) => (
                <SwiperSlide key={person.name}>
                    <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={person.profileURL}
                            alt={person.name}
                            className="w-20 h-20 rounded-full object-cover mb-2"
                        />
                        <span className="font-semibold text-sm">{person.name}</span>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                            {person.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}
