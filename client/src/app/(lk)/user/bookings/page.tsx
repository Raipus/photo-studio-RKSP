'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import BookingCreateForm from '@/components/LK/forms/BookingCreateForm'
import BookingUpdateForm from '@/components/LK/forms/BookingUpdateForm'
import UserBookingCreateForm from '@/components/LK/forms/UserBookingCreateForm'

import { getJwt } from '@/utils/auth/getJwt'
import { IBooking, IBookingCreate, IUser } from '@/utils/interfaces'

export default function UserBookingsPage() {
	const [bookings, setBookings] = useState<IBooking[]>([])
	const [user, setUser] = useState<IUser>()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/auth/getUserInfo', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache'
					}
				})
				const data = await response.json()
				setUser(data)
			} catch (error) {
				console.log('Ошибка при получении пользователя:', error)
			}
		}

		fetchUser()
	}, [])

	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const handleCreateOpenModal = () => setCreateModalOpen(true)
	const handleCreateCloseModal = () => setCreateModalOpen(false)
	const handleCreateSubmit = async (data: IBookingCreate) => {
		let accessToken = (await getJwt()).access
		try {
			const response = await fetch('http://localhost:3001/bookings', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			if (!response.ok) {
				const data = await response.json()
				toast.error(`${data.message}`, {
					position: 'top-center',
					autoClose: 2000
				})
			} else {
				try {
					let accessToken = (await getJwt()).access
					const response = await fetch('http://localhost:3001/bookings', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'Cache-Control': 'no-cache'
						}
					})
					const data = await response.json()
					if (!response.ok) {
						toast.error(`${data.message}`, {
							position: 'top-center',
							autoClose: 2000
						})
					} else setBookings(data)
				} catch (error) {
					console.error('Ошибка при получении броней:', error)
				}
			}
		} catch (error) {
			console.error('Ошибка при получении броней:', error)
		}
	}

	async function onSubmitDelete(id: number) {
		let accessToken = (await getJwt()).access
		const response = await fetch(`http://localhost:3001/bookings/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		const data1 = await response.json()
		if (!response.ok) {
			toast.error(`${data1.message}`, {
				position: 'top-center',
				autoClose: 2000
			})
		} else {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/bookings', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache'
					}
				})
				const data = await response.json()
				if (!response.ok) {
					toast.error(`${data.message}`, {
						position: 'top-center',
						autoClose: 2000
					})
				} else {
					setBookings(data)
					toast.success(`Бронь с id ${id} успешно отменена!`, {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined
					})
				}
			} catch (error) {
				console.error('Ошибка при получении броней:', error)
			}
		}
	}

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/bookings', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache'
					}
				})
				const data = await response.json()
				if (!response.ok) {
					toast.error(`${data.message}`, {
						position: 'top-center',
						autoClose: 2000
					})
				} else setBookings(data)
			} catch (error) {
				console.error('Ошибка при получении броней:', error)
			}
		}
		fetchBookings()
	}, [])

	return (
		<div>
			<ToastContainer />
			<UserBookingCreateForm
				isOpen={isCreateModalOpen}
				onClose={handleCreateCloseModal}
				onSubmit={handleCreateSubmit}
				userId={user?.id}
			/>
			<div className='grid place-content-center'>
				<div className='m-12 grid w-[600px] grid-cols-2 place-items-center text-center font-[family-name:var(--font-inter)] font-light'>
					<div className='text-center text-xl'>
						<p>Желаете забронировать</p>
						<p>новую сессию?</p>
					</div>
					<button
						onClick={handleCreateOpenModal}
						className='w-min whitespace-nowrap rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'
					>
						Создать бронь
					</button>
				</div>
			</div>
			<div className='flex items-center justify-center justify-items-center'>
				<div className='h-[400px] w-[1300px] rounded-md bg-[#EEF2E6] dark:bg-[#1D1D1C]'>
					<div className='h-[400px] max-w-full overflow-y-auto'>
						{bookings.map(booking => (
							<div
								key={booking.id}
								className='m-1 flex h-min min-w-[1282px] max-w-full items-center justify-between rounded-md bg-[#1C6758] p-1 text-white'
							>
								<p>
									Студия: {booking.studio.name} | Дата:{' '}
									{booking.date.toString()} | Кол-во людей:{' '}
									{booking.people_number} | Пользователь:{' '}
									{booking.user.fullname}, {booking.user.phone}
								</p>
								<div className='flex gap-4'>
									<button
										onClick={() => onSubmitDelete(booking.id)}
										className='rounded-md bg-[#3D8361] pb-1 pl-4 pr-4 pt-1 text-white duration-300 hover:bg-[#2F6A4E]'
									>
										Отменить
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
