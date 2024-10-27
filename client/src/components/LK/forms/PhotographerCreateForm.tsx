import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IPhotographerCreate } from '@/utils/interfaces'

interface PhotographerModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: SubmitHandler<IPhotographerCreate>
}

const PhotographerCreateForm: React.FC<PhotographerModalProps> = ({
	isOpen,
	onClose,
	onSubmit
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IPhotographerCreate>()
	const [isAnimating, setIsAnimating] = useState(false)

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
				<h2 className='mb-4 text-xl font-semibold'>Создать фотографа</h2>
				<button
					className='absolute right-3 top-1 scale-110 text-gray-500 transition-transform duration-500 hover:scale-150'
					onClick={closeModal}
				>
					&times;
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label className='mb-2 block'>
						ФИО:
						<input
							type='text'
							placeholder='Иванов Алексей Валерьевич'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('fullname', {
								required: true
							})}
						/>
						{errors.fullname && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Почта:
						<input
							type='email'
							placeholder='someemail@mail.ru'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('email', {
								required: true
							})}
						/>
						{errors.email && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Временный пароль:
						<input
							type='password'
							placeholder='Пароль'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('password', {
								required: true
							})}
						/>
						{errors.password && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Опыт работы:
						<input
							type='number'
							placeholder='1000'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('work_exp', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
						/>
						{errors.work_exp && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Цена:
						<input
							type='number'
							placeholder='1000'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('cost', {
								required: true,
								min: 1,
								valueAsNumber: true
							})}
						/>
						{errors.cost && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<button
						type='submit'
						className='mt-4 w-full rounded-md bg-[#3D8361] p-2 text-white duration-300 hover:bg-[#2F6A4E]'
					>
						Создать фотографа
					</button>
				</form>
			</div>
		</div>
	)
}

export default PhotographerCreateForm
