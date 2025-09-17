
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavigationBar from '@/Components/naviagtion/NavigationBar'
import Image from 'next/image'
import IButton from '@/Components/elements/IButton'
import { FluentAnimalPawPrint24Regular } from '@/Icons/FluentAnimalPawPrint24Regular'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <NavigationBar/>
        <div className='bg-blue-400 h-screen flex lg:flex-row flex-col-reverse pt-16 p-10'>
          <div className='lg:w-1/2 w-full lg:h-full h-1/2 flex justify-center items-center flex-col'> 
            <div className='flex flex-col justify-center items-center' style={{fontFamily:"Centaur"}}>
              <h1 className='lg:text-9xl text-6xl'>Lost, human?</h1>
              <h2 className='lg:text-6xl text-4xl lg:pl-3'>You took the wrong turn.</h2>
              <h3 className='lg:text-3xl text-2xl pl-5 lg:pt-5 pt-3 pb-10 flex gap-2'>
                <FluentAnimalPawPrint24Regular/>
                Now feed me and go back
              </h3>
              <span className='w-96'>
                <IButton address='/' Text='Home' color='magenta' isBlock/>
              </span>
            </div>
          </div>
          <div className='lg:w-1/2 w-full bg-cover bg-center flex justify-center items-center'>
              <Image
                className='hidden lg:block'
                src="/Cat.png"
                alt="Cat"
                width={600}
                height={600}
              />
              <Image
                className='lg:hidden block'
                src="/Cat.png"
                alt="Cat"
                width={300}
                height={300}
              />
          </div>
        </div>
      </body>
    </html>
  )
}