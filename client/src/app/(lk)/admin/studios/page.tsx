'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import StudioCreateForm from '@/components/LK/forms/StudioCreateForm'
import StudioUpdateForm from '@/components/LK/forms/StudioUpdateForm'

import { getJwt } from '@/utils/auth/getJwt'
import { IStudio, IStudioCreate } from '@/utils/interfaces'

export default function AdminStudiosPage() {
	const [studios, setStudios] = useState<IStudio[]>([])

	const [isCreateModalOpen, setCreateModalOpen] = useState(false)
	const handleCreateOpenModal = () => setCreateModalOpen(true)
	const handleCreateCloseModal = () => setCreateModalOpen(false)
	const handleCreateSubmit = async (data: IStudioCreate) => {
		let accessToken = (await getJwt()).access
		try {
			const response = await fetch('http://localhost:3001/studios', {
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
					const response = await fetch('http://localhost:3001/studios', {
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
					} else setStudios(data)
				} catch (error) {
					console.error('Ошибка при получении студий:', error)
				}
			}
		} catch (error) {
			console.error('Ошибка при получении студий:', error)
		}
	}

	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
	const [selectedStudio, setSelectedStudio] = useState<IStudio | null>(null)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IStudioCreate>()
	const handleUpdateOpenModal = (studio: IStudio) => {
		setSelectedStudio(studio)
		reset({ ...studio })
		setUpdateModalOpen(true)
	}
	const handleUpdateCloseModal = () => {
		setUpdateModalOpen(false)
		setSelectedStudio(null)
	}
	const handleUpdateSubmit = async (data: IStudioCreate) => {
		if (selectedStudio) {
			let accessToken = (await getJwt()).access
			const response = await fetch(
				`http://localhost:3001/studios/${selectedStudio.id}`,
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
				const updatedstudio = await response.json()
				setStudios(prev =>
					prev.map(studio =>
						studio.id === updatedstudio.id ? updatedstudio : studio
					)
				)
				handleUpdateCloseModal()
				toast.success(`Студия с id ${selectedStudio.id} успешно изменена!`, {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				})
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
		const response = await fetch(`http://localhost:3001/studios/${id}`, {
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
				const response = await fetch('http://localhost:3001/studios', {
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
					setStudios(data)
					toast.success(`Студия с id ${id} успешно удалена!`, {
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
				console.error('Ошибка при получении студий:', error)
			}
		}
	}

	useEffect(() => {
		const fetchstudios = async () => {
			try {
				let accessToken = (await getJwt()).access
				const response = await fetch('http://localhost:3001/studios', {
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
				} else setStudios(data)
			} catch (error) {
				console.error('Ошибка при получении студий:', error)
			}
		}
		fetchstudios()
	}, [])

	return (
		<div>
			<ToastContainer />
			<div className='m-12 text-center font-[family-name:var(--font-inter)] font-light'>
				<button
					onClick={handleCreateOpenModal}
					className='rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'
				>
					Создать студию
				</button>
				<StudioCreateForm
					isOpen={isCreateModalOpen}
					onClose={handleCreateCloseModal}
					onSubmit={handleCreateSubmit}
				/>
				<StudioUpdateForm
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
						{studios.map(studio => (
							<div
								key={studio.id}
								className='m-1 flex h-min min-w-[1282px] max-w-full items-center justify-between rounded-md bg-[#1C6758] p-1 text-white'
							>
								<p>
									ID: {studio.id} | Название: {studio.name} | Локация:{' '}
									{studio.location} | Описание: {studio.description} | Цена:{' '}
									{studio.cost}
								</p>
								<div className='flex gap-4'>
									<button
										onClick={() => handleUpdateOpenModal(studio)}
										className='rounded-md bg-[#3D8361] pb-1 pl-4 pr-4 pt-1 text-white duration-300 hover:bg-[#2F6A4E]'
									>
										Изменить
									</button>
									<button
										onClick={() => onSubmitDelete(studio.id)}
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
