'use client'

import Link from 'next/link'

const Footer = () => {
	return (
		<div className='flex h-auto w-full flex-col items-center justify-center bg-[#FFFFFF] pb-5 pt-24 dark:bg-[#111111]'>
			<div className='order-1 flex w-[1300px] items-end justify-between pb-[50px]'>
				<p className='w-[650px] font-[family-name:var(--font-inter)] text-4xl font-bold'>
					Дайте волю своему творчеству в наших универсальных студийных
					пространствах.
				</p>
				<Link href='/signin'>
					<button className='rounded-md bg-[#3D8361] pb-3 pl-11 pr-11 pt-3 text-white duration-300 hover:bg-[#2F6A4E]'>
						Забронировать
					</button>
				</Link>
			</div>
			<div className='order-2 mt-1 flex w-[1300px] items-center justify-start border-t-[1px] border-gray-500 pt-16'>
				© Copyright 2024, Все права защищены.
			</div>
		</div>
	)
}

export default Footer
