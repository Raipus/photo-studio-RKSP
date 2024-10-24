'use client'

import { useEffect, useState } from 'react'

import Footer from '@/components/LK/footer'
import Header from '@/components/LK/header'

import { getJwt } from '@/utils/auth/getJwt'
import { IBooking, IPhotographer } from '@/utils/interfaces'

export default function PhotographerPage() {
	const [bookings, setBookings] = useState<IBooking[]>([])
	const [photographer, setPhotographer] = useState<IPhotographer>()
	const [error, setError] = useState()

	useEffect(() => {
		const fetchPhotographer = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/auth/getUserInfo', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache',
						Pragma: 'no-cache',
						Expires: '0'
					}
				})
				const data = await response.json()
				setPhotographer(data)
			} catch (error) {
				console.log('Ошибка при получении фотографа:', error)
			}
		}

		fetchPhotographer()
	}, [])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/bookings', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache',
						Pragma: 'no-cache',
						Expires: '0'
					}
				})
				const data = await response.json()
				if (!response.ok) {
					setError(data.message)
				} else setBookings(data)
			} catch (error) {
				console.error('Ошибка при получении броней:', error)
			}
		}
		fetchBookings()
	}, [])

	return (
		<div className='min-w-screen min-h-screen items-center justify-center justify-items-center font-[family-name:var(--font-roboto-mono)] text-lg'>
			<Header />
			<label className='mt-28 grid place-content-center pb-9 font-[family-name:var(--font-inter)] text-3xl uppercase'>
				{photographer?.fullname}
			</label>
			<div className='grid place-content-center bg-[#1C6758]'>
				<div className='grid w-[1300px] grid-cols-1'>
					<a className='m-1 py-4 text-center text-2xl duration-300'>
						Брони, в которых Вы принимаете участие
					</a>
				</div>
			</div>
			<div className='m-12 text-center font-[family-name:var(--font-inter)] text-2xl font-light'>
				<p>Создание, изменение и отмена брони</p>
				<p>только через администратора</p>
			</div>
			{error && (
				<p className='mb-3 mt-3 text-center text-2xl text-red-400'>{error}</p>
			)}
			<div className='flex items-center justify-center justify-items-center'>
				<div className='h-[320px] w-[1300px] rounded-sm bg-[#1D1D1C]'>
					<div className='grid h-[320px] max-w-full overflow-y-scroll'>
						{bookings.map(booking => (
							<div
								key={booking.id}
								className='m-1 h-min w-[1282px] max-w-full rounded-md bg-[#1C6758] p-1'
							>
								<p>
									Студия: {booking.studio.name} | Дата:{' '}
									{booking.date.toString()} | Кол-во людей:{' '}
									{booking.people_number} | Пользователь:{' '}
									{booking.user.fullname}, {booking.user.phone}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
