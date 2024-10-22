"use client"
import Footer from "@/components/LK/footer"
import Header from "@/components/LK/header"
import { useEffect, useState } from 'react'

interface IBooking{
	id: number
	date: Date
	people_amount: number
	userID: number
	studioID: number
	photographerID: number
}

export default function AdminPage() {
	const [bookings, setBookings] = useState<IBooking[]>([])

	useEffect(() => {
		const fetchBookings = async () => {
			try{
				const response = await fetch('http:localhost:3001/bookings')
				const data = await response.json()
				setBookings(data)
			}
			catch(error){
				console.log('Ошибка при получении броней:', error)
			}
		}
		fetchBookings()
	}, [])

    return (
    <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-roboto-mono)] text-lg">
      <Header/>
      <label className='grid place-content-center text-4xl pb-9'>Админ панель</label>
      <div className='bg-[#1C6758] grid place-content-center'>
        <div className='w-[1300px] grid grid-cols-3'>
			<a className='py-4 text-center hover:scale-90 text-2xl hover:bg-[#17574ab0] duration-300'>Студии</a>
			<a className='py-4 text-center hover:scale-90 text-2xl hover:bg-[#17574ab0] duration-300'>Фотографы</a>
          	<a className='py-4 text-center hover:scale-90 text-2xl hover:bg-[#17574ab0] duration-300'>Брони</a>
        </div>
      </div>

			<div className=''>

			</div>
      <Footer/>
    </div>
    )
}