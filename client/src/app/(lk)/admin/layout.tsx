'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Footer from '@/components/LK/footer'
import Header from '@/components/LK/header'

import { getJwt } from '@/utils/auth/getJwt'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		async function RoleCheck() {
			let accessToken = (await getJwt()).access
			let refreshToken = (await getJwt()).refresh
			if (!refreshToken) {
				router.push('/signin')
			} else {
				await fetch('http://localhost:3001/auth/getUserInfo', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Cache-Control': 'no-cache',
						Pragma: 'no-cache',
						Expires: '0'
					}
				})
					.then(response => response.json())
					.then(data => {
						if (data.role == 'admin') {
							setIsAdmin(true)
						} else if (data.role == 'user') {
							setIsAdmin(false)
							router.push('/user')
						} else if (data.role == 'photographer') {
							setIsAdmin(false)
							router.push('/photographer')
						} else {
							setIsAdmin(false)
							router.push('/signin')
						}
					})
					.catch(error => {
						console.error('Error:', error)
						router.push('/')
					})
			}
		}
		RoleCheck()
	}, [router])

	return (
		<div style={{ height: '100vh' }}>
			{isAdmin ? (
				<div className='min-w-screen min-h-screen items-center justify-items-center font-[family-name:var(--font-roboto-mono)] text-lg'>
					<Header />
					<label className='mt-28 grid place-content-center pb-9 text-4xl'>
						Админ панель
					</label>
					<div className='grid place-content-center bg-[#1C6758]'>
						<div className='grid w-[1300px] grid-cols-3'>
							<a
								href='/admin/studios'
								className='m-1 ml-2 mr-2 rounded-lg bg-[#3D8361] py-4 text-center text-2xl text-white duration-300 hover:scale-90 hover:bg-[#2F6A4E]'
							>
								Студии
							</a>
							<a
								href='/admin/photographers'
								className='m-1 ml-2 mr-2 rounded-lg bg-[#3D8361] py-4 text-center text-2xl text-white duration-300 hover:scale-90 hover:bg-[#2F6A4E]'
							>
								Фотографы
							</a>
							<a
								href='/admin/bookings'
								className='m-1 ml-2 mr-2 rounded-lg bg-[#3D8361] py-4 text-center text-2xl text-white duration-300 hover:scale-90 hover:bg-[#2F6A4E]'
							>
								Брони
							</a>
						</div>
					</div>
					{children}
					<Footer />
				</div>
			) : null}
		</div>
	)
}

export default Layout
