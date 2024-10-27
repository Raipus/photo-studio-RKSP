'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PhotographerCreateForm from '@/components/LK/forms/PhotographerCreateForm'
import PhotographerUpdateForm from '@/components/LK/forms/PhotographerUpdateForm'

import { getJwt } from '@/utils/auth/getJwt'
import { IPhotographer, IPhotographerCreate } from '@/utils/interfaces'

export default function AdminPhotographersPage() {
	const [photographers, setPhotographers] = useState<IPhotographer[]>([])

	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const handleCreateOpenModal = () => setCreateModalOpen(true)
	const handleCreateCloseModal = () => setCreateModalOpen(false)
	const handleCreateSubmit = async (data: IPhotographerCreate) => {
		let accessToken = (await getJwt()).access
		try {
			const response = await fetch('http://localhost:3001/photographers', {
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
					const response = await fetch('http://localhost:3001/photographers', {
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
						setPhotographers(data)
						toast.success(`Фотограф успешно создан!`, {
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
					console.error('Ошибка при получении фотографов:', error)
				}
			}
		} catch (error) {
			console.error('Ошибка при получении фотографов:', error)
		}
	}

	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
	const [selectedPhotographer, setSelectedPhotographer] =
		useState<IPhotographer | null>(null)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IPhotographerCreate>()
	const handleUpdateOpenModal = (photographer: IPhotographer) => {
		setSelectedPhotographer(photographer)
		reset({
			...photographer
		})
		setUpdateModalOpen(true)
	}
	const handleUpdateCloseModal = () => {
		setUpdateModalOpen(false)
		setSelectedPhotographer(null)
	}
	const handleUpdateSubmit = async (data: IPhotographerCreate) => {
		if (selectedPhotographer) {
			let accessToken = (await getJwt()).access
			const response = await fetch(
				`http://localhost:3001/photographers/${selectedPhotographer.id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			)

			if (response.ok) {
				const updatedPhotographer = await response.json()
				setPhotographers(prev =>
					prev.map(photographer =>
						photographer.id === updatedPhotographer.id
							? updatedPhotographer
							: photographer
					)
				)
				handleUpdateCloseModal()
				toast.success(
					`Фотограф с id ${selectedPhotographer.id} успешно изменен!`,
					{
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined
					}
				)
			} else {
				const data = await response.json()
				toast.error(`${data.message}`, {
					position: 'top-center',
					autoClose: 2000
				})
			}
		}
	}

	async function onSubmitDelete(id: number) {
		let accessToken = (await getJwt()).access
		const response = await fetch(`http://localhost:3001/photographers/${id}`, {
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
				const response = await fetch('http://localhost:3001/photographers', {
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
					setPhotographers(data)
					toast.success(`Фотограф с id ${id} успешно удален!`, {
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
				console.error('Ошибка при получении фотографов:', error)
			}
		}
	}

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/photographers', {
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
				} else setPhotographers(data)
			} catch (error) {
				console.error('Ошибка при получении фотографов:', error)
			}
		}
		fetchPhotographers()
	}, [])

	return (
		<div>
			<ToastContainer />
			<div className='m-12 text-center font-[family-name:var(--font-inter)] font-light'>
				<button
					onClick={handleCreateOpenModal}
					className='rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'
				>
					Создать фотографа
				</button>
				<PhotographerCreateForm
					isOpen={isCreateModalOpen}
					onClose={handleCreateCloseModal}
					onSubmit={handleCreateSubmit}
				/>
				<PhotographerUpdateForm
					isOpen={isUpdateModalOpen}
					onClose={handleUpdateCloseModal}
					onSubmit={handleUpdateSubmit}
					register={register}
					errors={errors}
					handleSubmit={handleSubmit}
				/>
			</div>
			<div className='flex items-center justify-center justify-items-center'>
				<div className='h-[400px] w-[1300px] rounded-md bg-[#EEF2E6] dark:bg-[#1D1D1C]'>
					<div className='h-[400px] max-w-full overflow-y-auto'>
						{photographers.map(photographer => (
							<div
								key={photographer.id}
								className='m-1 flex h-min min-w-[1282px] max-w-full items-center justify-between rounded-md bg-[#1C6758] p-1 text-white'
							>
								<p>
									ID: {photographer.id} | ФИО: {photographer.fullname} | Почта:{' '}
									{photographer.email} | Телефон: {photographer.phone} | Опыт
									работы: {photographer.work_exp} | Цена: {photographer.cost}
								</p>
								<div className='flex gap-4'>
									<button
										onClick={() => handleUpdateOpenModal(photographer)}
										className='rounded-md bg-[#3D8361] pb-1 pl-4 pr-4 pt-1 text-white duration-300 hover:bg-[#2F6A4E]'
									>
										Изменить
									</button>
									<button
										onClick={() => onSubmitDelete(photographer.id)}
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
