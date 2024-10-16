'use client'
import Footer from "@/components/footer"
import Header from "@/components/header"
import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IStudio {
  id: number
	name: string
  location: string
	description: string
	cost:number
}

interface IPhotographer{
  id: number
  fullname: string
  email: string
  phone: number
  password: string
  role: string
  work_exp: number
  cost:number  
}

const HomePage = () => {
	const [studios, setStudios] = useState<IStudio[]>([])
  const [photographers, setPhotographers] = useState<IPhotographer[]>([])

	useEffect(() => {
		const fetchStudios = async () => {
      try{
			const response = await fetch('http://localhost:3001/studios', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
			const data = await response.json()
			setStudios(data)
      }
      catch(error){
        console.log('Ошибка при получении студий:', error)
      }
		}

		fetchStudios()
	}, [])

	useEffect(() => {
		const fetchPhotographers = async () => {
      try{
			const response = await fetch('http://localhost:3001/photographers', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
			const data = await response.json()
			setPhotographers(data)
      }
      catch(error){
        console.log('Ошибка при получении студий:', error)
      }
		}

		fetchPhotographers()
	}, []) 
  return (
    <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-roboto-mono)] text-lg">
      <Header/>
      <div className="flex min-w-full dark:bg-[#111111] bg-[#EEF2E6] h-[870px] items-center justify-center">
        <div className="flex justify-between w-[1300px] h-auto pt-16 pb-24">
          <div className="w-[600px] h-auto">
            <div className="animate-[slideRightEnter_1s_ease-in-out] font-[family-name:var(--font-inter)] font-bold text-6xl leading-tight mt-10">
              Создавайте Незабываемые Впечатления Уже Сегодня!
            </div>
            <div className="animate-[slideRightEnter_1.25s_ease-in-out] w-[300px] h-auto mt-10">
              Richard's Studios предлагает аренду студий для всех ваших потребностей в фото и видео съемке. 
            </div>
            <Link href='/loginPage'>
              <button className="animate-[slideRightEnter_1.5s_ease-in-out] mt-10 pt-3 pb-3 pl-11 pr-11 bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 rounded-md text-white font-medium">Забронировать студию сейчас</button>
            </Link>
          </div>
          <div className="animate-[slideLeftEnter_1s_ease-in-out] w-[500px] h-[600px]">
            <Image
              src="/home1.jpg"
              alt="Изображение дома"
              width={500}
              height={600}
              quality={100}
              className="w-full h-full object-cover rounded-[3%]"
            />
          </div>
        </div>
      </div>
      <div id="about-us" className="flex min-w-full bg-[#1C6758] items-center justify-center text-white">
        <div className="w-[1300px] h-auto pt-14 pb-14 flex justify-between">
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">50+</div>
            <div className="text-center mt-4">Современного оборудования для получения потрясающих результатов фотосъемки.</div>
          </div>
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">100%</div>
            <div className="text-center mt-4">Квалифицированные рекомендации для безупречной фотосъемки.</div>
          </div>
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">100+</div>
            <div className="text-center mt-4">Индивидуальных макетов для универсальных фотосессий.</div>
          </div>
        </div>
      </div>
      <div className='grid place-content-center'>
      <div id='studios' className='grid grid-cols-1 text-center w-[1300px]'>
        <a className='text-4xl'>Наши студии:</a>
				<div className='inline-flex max-w-full overflow-x-scroll'>
						<div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>

            <div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
              <div>
                <h3 className='text-4xl'>Уютный камин</h3>  
              </div>
              <div>
        				<p>ул. Ленинский проспект, д.6</p>
                <p>4000 руб/ч</p>        
              </div>
						</div>
				</div>
      </div>
      
      <div id='photographers' className='grid grid-cols-1 text-center w-[1300px]'>
        <a className='text-4xl'>Наши фотографы:</a>
				<div className='inline-flex max-w-full overflow-x-scroll'>
						<div className='bg-[#1C6758] m-10 p-4 h-[300px] w-[400px] rounded-3xl grid content-around'>
							<h3>Уютный камин</h3>
							<p></p>
              <p></p>
						</div>
				</div>
      </div>
      </div>
      <Footer/>
    </div>
    )
};

export default HomePage;