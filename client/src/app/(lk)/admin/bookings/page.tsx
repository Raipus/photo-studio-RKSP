'use client'

import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import BookingCreateForm from '@/components/LK/forms/BookingCreateForm'
import BookingUpdateForm from '@/components/LK/forms/BookingUpdateForm'

import { getJwt } from '@/utils/auth/getJwt'
import { IBooking, IBookingCreate } from '@/utils/interfaces'

export default function AdminBookingsPage() {
	const [bookings, setBookings] = useState<IBooking[]>([])
	const [error, setError] = useState()
	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

	const handleCreateOpenModal = () => setCreateModalOpen(true)
	const handleCreateCloseModal = () => setCreateModalOpen(false)

	const handleUpdateOpenModal = () => setUpdateModalOpen(true)
	const handleUpdateCloseModal2 = () => setUpdateModalOpen(false)
	function handleUpdateCloseModal(data: IBooking[]) {
		setUpdateModalOpen(false)
		setBookings(data)
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
			setError(data1.message)
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
					setError(data.message)
				} else {
					setBookings(data)
					toast.success(`Бронь с id ${id} успешно удалена!`, {
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
				setError(data.message)
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
						setError(data.message)
					} else setBookings(data)
				} catch (error) {
					console.error('Ошибка при получении броней:', error)
				}
			}
		} catch (error) {
			console.error('Ошибка при получении броней:', error)
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
					setError(data.message)
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
			<div className='m-12 text-center font-[family-name:var(--font-inter)] font-light'>
				<button
					onClick={handleCreateOpenModal}
					className='rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'
				>
					Создать бронь
				</button>
				<BookingCreateForm
					isOpen={isCreateModalOpen}
					onClose={handleCreateCloseModal}
					onSubmit={handleCreateSubmit}
				/>
			</div>
			{error && (
				<p className='mb-14 mt-3 text-center text-2xl text-red-400'>{error}</p>
			)}
			<div className='flex items-center justify-center justify-items-center'>
				<div className='h-[400px] w-[1300px] rounded-md bg-[#EEF2E6] dark:bg-[#1D1D1C]'>
					<div className='h-[400px] max-w-full overflow-y-auto'>
						{bookings.map(booking => (
							<div
								key={booking.id}
								className='m-1 flex h-min min-w-[1282px] max-w-full items-center justify-between rounded-md bg-[#1C6758] p-1 text-white'
							>
								{/* <BookingUpdateForm
									isOpen={isUpdateModalOpen}
									onClose={() => handleUpdateCloseModal}
									onClose2={handleUpdateCloseModal2}
									id={booking.id}
								/> */}
								<p>
									ID: {booking.id} | Студия: {booking.studio.name} | Дата:{' '}
									{booking.date.toString()} | Кол-во людей:{' '}
									{booking.people_number} | Пользователь:{' '}
									{booking.user.fullname}, {booking.user.phone}
								</p>
								<div className='flex gap-4'>
									<button
										onClick={handleUpdateOpenModal}
										className='rounded-md bg-[#3D8361] pb-1 pl-4 pr-4 pt-1 text-white duration-300 hover:bg-[#2F6A4E]'
									>
										Изменить
									</button>
									<button
										onClick={() => onSubmitDelete(booking.id)}
										className='rounded-md bg-[#3D8361] pb-1 pl-4 pr-4 pt-1 text-white duration-300 hover:bg-[#2F6A4E]'
									>
										Удалить
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
