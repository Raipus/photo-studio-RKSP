'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

import { IPhotographer, IStudio } from '@/utils/interfaces'

const HomePage = () => {
	const [studios, setStudios] = useState<IStudio[]>([])
	const [photographers, setPhotographers] = useState<IPhotographer[]>([])

	useEffect(() => {
		const fetchStudios = async () => {
			try {
				const response = await fetch('http://localhost:3001/studios', {
					method: 'GET',
					headers: {
						'Cache-Control': 'no-cache'
					}
				})
				const data = await response.json()
				setStudios(data)
			} catch (error) {
				console.log('Ошибка при получении студий:', error)
			}
		}

		fetchStudios()
	}, [])

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				const response = await fetch('http://localhost:3001/photographers', {
					method: 'GET',
					headers: {
						'Cache-Control': 'no-cache'
					}
				})
				const data = await response.json()
				setPhotographers(data)
			} catch (error) {
				console.log('Ошибка при получении студий:', error)
			}
		}

		fetchPhotographers()
	}, [])
	return (
		<div className='min-w-screen min-h-screen items-center justify-items-center font-[family-name:var(--font-roboto-mono)] text-lg'>
			<Header />
			<div className='flex h-[870px] min-w-full items-center justify-center bg-[#EEF2E6] dark:bg-[#111111]'>
				<div className='flex h-auto w-[1300px] justify-between pb-24 pt-16'>
					<div className='h-auto w-[600px]'>
						<div className='mt-10 animate-[slideRightEnter_1s_ease-in-out] font-[family-name:var(--font-inter)] text-6xl font-bold leading-tight'>
							Создавайте Незабываемые Впечатления Уже Сегодня!
						</div>
						<div className='mt-10 h-auto w-[300px] animate-[slideRightEnter_1.25s_ease-in-out]'>
							Richard's Studios предлагает аренду студий для всех ваших
							потребностей в фото и видео съемке.
						</div>
						<Link href='/signin'>
							<button className='mt-10 animate-[slideRightEnter_1.5s_ease-in-out] rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 font-medium text-white duration-300 hover:bg-[#2F6A4E]'>
								Забронировать студию сейчас
							</button>
						</Link>
					</div>
					<div className='h-[600px] w-[500px] animate-[slideLeftEnter_1s_ease-in-out]'>
						<Image
							src='/home1.jpg'
							alt='Изображение дома'
							width={500}
							height={600}
							quality={100}
							className='h-full w-full rounded-[3%] object-cover'
						/>
					</div>
				</div>
			</div>
			<div className='flex min-w-full items-center justify-center bg-[#1C6758] text-white'>
				<div className='flex h-auto w-[1300px] justify-between pb-14 pt-14'>
					<div className='flex h-auto w-[335px] animate-[opacityEnter_1s_ease-in-out] flex-col items-center'>
						<div className='font-[family-name:var(--font-inter)] text-5xl font-bold'>
							50+
						</div>
						<div className='mt-4 text-center'>
							Современного оборудования для получения потрясающих результатов
							фотосъемки.
						</div>
					</div>
					<div className='flex h-auto w-[335px] animate-[opacityEnter_1s_ease-in-out] flex-col items-center'>
						<div className='font-[family-name:var(--font-inter)] text-5xl font-bold'>
							100%
						</div>
						<div className='mt-4 text-center'>
							Квалифицированные рекомендации для безупречной фотосъемки.
						</div>
					</div>
					<div className='flex h-auto w-[335px] animate-[opacityEnter_1s_ease-in-out] flex-col items-center'>
						<div className='font-[family-name:var(--font-inter)] text-5xl font-bold'>
							100+
						</div>
						<div className='mt-4 text-center'>
							Индивидуальных макетов для универсальных фотосессий.
						</div>
					</div>
				</div>
			</div>
			<div className='grid place-content-center'>
				<div
					id='studios'
					className='grid w-[1300px] grid-cols-1 text-center'
				>
					<a className='mb-10 mt-20 text-4xl'>Наши студии:</a>
					<div className='inline-flex overflow-x-scroll text-white'>
						{studios.map(studio => (
							<div
								key={studio.id}
								className='mb-3 mr-12 h-[320px] min-w-[400px] max-w-[400px] rounded-3xl bg-[#1C6758] p-4'
							>
								<h3 className='mb-5 text-4xl'>{studio.name}</h3>
								<h3 className='mb-10 text-2xl'>Номер студии: {studio.id}</h3>
								<p className='mb-5'>Описание: {studio.description}</p>
								<p className='mb-5'>Локация: {studio.location}</p>
								<p className='mb-5'>Цена (за час): {studio.cost}</p>
							</div>
						))}
					</div>
				</div>

				<div
					id='photographers'
					className='grid w-[1300px] grid-cols-1 text-center'
				>
					<a className='mb-10 mt-20 text-4xl'>Наши фотографы:</a>
					<div className='inline-flex overflow-x-scroll text-white'>
						{photographers.map(photographer => (
							<div
								key={photographer.id}
								className='mb-3 mr-12 h-[300px] min-w-[400px] max-w-[600px] rounded-3xl bg-[#1C6758] p-4'
							>
								<h3 className='mb-5 text-4xl'>{photographer.fullname}</h3>
								<h3 className='mb-10 text-2xl'>
									Номер фотографа: {photographer.id}
								</h3>
								<p className='mb-5'>Опыт работы: {photographer.work_exp}</p>
								<p className='mb-5'>Цена (за час): {photographer.cost}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default HomePage
