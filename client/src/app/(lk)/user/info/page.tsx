'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { getJwt } from '@/utils/auth/getJwt'
import { IUser, IUserCreate } from '@/utils/interfaces'

export default function UserInfoPage() {
	const [user, setUser] = useState<IUser>()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IUserCreate>()

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
				reset(data)
			} catch (error) {
				console.log('Ошибка при получении пользователя:', error)
			}
		}
		fetchUser()
	}, [])

	const onSubmit = async (data: IUserCreate) => {
		let accessToken = (await getJwt()).access
		const response = await fetch(`http://localhost:3001/users/${user.id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (response.ok) {
			toast.success(`Данные были успешно изменены!`, {
				position: 'top-center',
				autoClose: 2000
			})
		} else {
			const data = await response.json()
			toast.error(`${data.message}`, {
				position: 'top-center',
				autoClose: 2000
			})
		}
	}

	return (
		<div
			className={
				'grid place-content-center rounded-lg p-6 text-center font-light shadow-lg'
			}
		>
			<h2 className='mb-10 mt-10 text-3xl'>Изменение личной информации</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-96'
			>
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
					Телефон:
					<input
						type='tel'
						placeholder='+7 (985) 474-67-72'
						className='mt-1 block w-full rounded-md border p-2 text-black'
						{...register('phone', {
							required: true
						})}
					/>
					{errors.phone && (
						<span className='text-red-500'>Это поле обязательно</span>
					)}
				</label>
				<label className='mb-2 block'>
					Пароль:
					<input
						type='password'
						placeholder='Пароль'
						className='mt-1 block w-full rounded-md border p-2 text-black'
						{...register('password')}
					/>
				</label>
				<button
					type='submit'
					className='mt-4 w-min rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'
				>
					Сохранить
				</button>
			</form>
		</div>
	)
}
