import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { getJwt } from '@/utils/auth/getJwt'
import { IBookingCreate } from '@/utils/interfaces'

interface BookingModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: SubmitHandler<IBookingCreate>
}

const BookingCreateForm: React.FC<BookingModalProps> = ({
	isOpen,
	onClose,
	onSubmit
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IBookingCreate>()
	const [isAnimating, setIsAnimating] = useState(false)
	const date = watch('date')
	const studioId = watch('studio_id')
	const [isAvailable, setIsAvailable] = React.useState(null)

	const checkAvailability = async () => {
		if (!date || !studioId) return null

		try {
			let accessToken = (await getJwt()).access
			const response = await fetch(
				`http://localhost:3001/bookings/check/${studioId}/${date}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache'
					}
				}
			)
			const data = await response.json()
			setIsAvailable(data.available)
		} catch (error) {
			console.error('Ошибка при проверке доступности:', error)
		}
	}

	useEffect(() => {
		checkAvailability()
	}, [date, studioId])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal()
			}
		}

		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	const closeModal = () => {
		setIsAnimating(true)
		setTimeout(() => {
			onClose()
			setIsAnimating(false)
		}, 500)
	}

	useEffect(() => {
		if (isOpen) {
			setIsAnimating(false)
		}
	}, [isOpen])

	if (!isOpen && !isAnimating) return null

	return (
		<div
			className={`fixed inset-0 z-50 flex animate-[opacityEnter_0.5s_ease-in-out] items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
		>
			<div
				className={`w-96 transform rounded-lg bg-[#FFFFFF] p-6 shadow-lg transition-transform duration-500 dark:bg-[#111111] ${isAnimating ? 'scale-90' : 'scale-100'}`}
			>
				<h2 className='mb-4 text-xl font-semibold'>Создать бронь</h2>
				<button
					className='absolute right-3 top-1 scale-110 text-gray-500 transition-transform duration-500 hover:scale-150'
					onClick={closeModal}
				>
					&times;
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label className='mb-2 block'>
						Дата:
						<input
							type='date'
							{...register('date', { required: true })}
							className='mt-1 block w-full rounded-md border p-2 text-black'
						/>
						{errors.date && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Кол-во людей:
						<input
							type='number'
							placeholder='1'
							{...register('people_number', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
							className='mt-1 block w-full rounded-md border p-2 text-black'
						/>
						{errors.people_number && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						ID студии:
						<input
							type='number'
							placeholder='1'
							{...register('studio_id', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
							className='mt-1 block w-full rounded-md border p-2 text-black'
						/>
						{errors.studio_id && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
						{isAvailable !== null && (
							<p className={isAvailable ? 'text-green-400' : 'text-red-400'}>
								Студия {isAvailable ? 'доступна' : 'недоступна'} на выбранную
								дату.
							</p>
						)}
					</label>
					<label className='mb-2 block'>
						ID пользователя:
						<input
							type='number'
							placeholder='1'
							{...register('user_id', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
							className='mt-1 block w-full rounded-md border p-2 text-black'
						/>
						{errors.user_id && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						ID фотографа:
						<input
							type='number'
							placeholder='1'
							{...register('photographer_id', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
							className='mt-1 block w-full rounded-md border p-2 text-black'
						/>
						{errors.photographer_id && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<button
						type='submit'
						className={`mt-4 w-full rounded-md bg-[#3D8361] p-2 text-white duration-300 hover:bg-[#2F6A4E] ${isAvailable === false ? 'cursor-not-allowed opacity-50' : ''}`}
						disabled={isAvailable === false}
					>
						Создать бронь
					</button>
				</form>
			</div>
		</div>
	)
}

export default BookingCreateForm
