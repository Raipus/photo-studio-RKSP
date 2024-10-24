'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getJwt } from '@/utils/auth/getJwt'

const Header = () => {
	const [hasTokens, setHasTokens] = useState(false)

	useEffect(() => {
		async function TokenCheck() {
			let refreshToken = (await getJwt()).refresh
			if (!refreshToken) {
				setHasTokens(false)
			} else {
				setHasTokens(true)
			}
		}
		TokenCheck()
	}, [])

	return (
		<div className='z-10 flex h-24 min-w-full items-center justify-center bg-[#EEF2E6] transition-all duration-300 dark:bg-[#111111]'>
			<div className='flex w-[1300px] justify-between'>
				<div className='flex w-full items-center justify-start'>
					<a
						href='/home'
						className='font-[family-name:var(--font-inter)] text-2xl font-bold'
					>
						Richard's Studios
					</a>
				</div>
				<div className='flex w-full items-center justify-between'>
					<div>
						<a
							href='/home'
							className='mr-4 p-4'
						>
							Главная
						</a>
						<a
							href='/#studios'
							className='mr-4 p-4'
						>
							Cтудии
						</a>
						<a
							href='/#photographers'
							className='mr-4 p-4'
						>
							Фотографы
						</a>
						<a
							href='/#contacts'
							className='mr-4 p-4'
						>
							Контакты
						</a>
					</div>
					{hasTokens ? (
						<Link href='/user'>
							<button className='whitespace-nowrap rounded-md bg-[#3D8361] pb-3 pl-12 pr-12 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'>
								Личный кабинет
							</button>
						</Link>
					) : (
						<Link href='/signin'>
							<button className='rounded-md bg-[#3D8361] pb-3 pl-14 pr-14 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'>
								Вход
							</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
