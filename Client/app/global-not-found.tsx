
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavigationBar from '@/Components/naviagtion/NavigationBar'
import Image from 'next/image'
import IButton from '@/Components/elements/IButton'
 
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
        <div className='bg-blue-400 h-screen flex pt-16'>
          <div className='w-1/2 h-full flex justify-center items-center flex-col'> 
            <div className='relative' style={{fontFamily:"Centaur"}}>
              <h1 className='text-9xl'>Lost, human?</h1>
              <h2 className='text-6xl pl-3'>You took the wrong turn.</h2>
              <h3 className='text-3xl pl-5 pb-10'>Now feed me and go back</h3>
              <span className='w-96'>
                <IButton address='/' Text='Home' color='magenta' isBlock/>
              </span>
            </div>
          </div>
          <div 
            className='w-1/2 bg-cover bg-center flex justify-center items-center'
          >
              <Image
                src="/Cat.png"
                alt="Cat"
                width={600}
                height={600}
              />
          </div>
        </div>
      </body>
    </html>
  )
}