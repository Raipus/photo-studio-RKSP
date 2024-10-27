'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { getJwt } from '@/utils/auth/getJwt'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const [isPhotographer, setIsPhotographer] = useState(false)

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
							setIsPhotographer(false)
							router.push('/admin')
						} else if (data.role == 'user') {
							setIsPhotographer(false)
							router.push('/user')
						} else if (data.role == 'photographer') {
							setIsPhotographer(true)
						} else {
							setIsPhotographer(false)
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
		<div style={{ height: '100vh' }}>{isPhotographer ? children : null}</div>
	)
}

export default Layout
