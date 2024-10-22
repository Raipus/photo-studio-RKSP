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

export default function AdminPhotographersPage() {
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
		<div className="">photo</div>
    )
}