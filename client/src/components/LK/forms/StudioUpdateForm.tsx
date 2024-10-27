import React, { useEffect, useState } from 'react'
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form'

import { IStudioCreate } from '@/utils/interfaces'

interface StudioModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: IStudioCreate) => Promise<void>
	register: UseFormRegister<IStudioCreate>
	errors: FieldErrors<IStudioCreate>
	handleSubmit: UseFormHandleSubmit<IStudioCreate, undefined>
}

const StudioUpdateForm: React.FC<StudioModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	register,
	errors,
	handleSubmit
}) => {
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
				<h2 className='mb-4 text-xl font-semibold'>Изменить студию</h2>
				<button
					className='absolute right-3 top-1 scale-110 text-gray-500 transition-transform duration-500 hover:scale-150'
					onClick={closeModal}
				>
					&times;
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label className='mb-2 block'>
						Название:
						<input
							type='text'
							placeholder='Уютный камин'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('name', {
								required: true
							})}
						/>
						{errors.name && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Локация:
						<input
							type='text'
							placeholder='г. Москва, Ленинский проспект, д. 6'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('location', {
								required: true
							})}
						/>
						{errors.location && (
							<span className='text-red-500'>Это поле обязательно</span>
						)}
					</label>
					<label className='mb-2 block'>
						Описание:
						<input
							type='text'
							placeholder='Помещение с красивым уютным камином'
							className='mt-1 block w-full rounded-md border p-2 text-black'
							{...register('description', {
								required: true
							})}
						/>
						{errors.description && (
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
						Изменить студию
					</button>
				</form>
			</div>
		</div>
	)
}

export default StudioUpdateForm
