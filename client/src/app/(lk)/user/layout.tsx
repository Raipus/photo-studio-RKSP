'use client';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import { getJwt } from '@/utils/auth/getJwt';
import Footer from '@/components/LK/footer';
import Header from '@/components/LK/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function RoleCheck (){
            let accessToken = (await getJwt()).access
            let refreshToken = (await getJwt()).refresh
            if (!refreshToken) {
                router.push('/signin')
            } else {
                await fetch('http://localhost:3001/auth/getUserInfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.role == 'admin') {
                        setIsAdmin(true);
                    } else if (data.role == 'user') {
                        setIsAdmin(true);
                    } else if (data.role == 'photographer') {
                        setIsAdmin(false);
                        router.push('/photographer');
                    } else {
                        setIsAdmin(false);
                        router.push('/signin');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    router.push('/');
                });
            }
        }
        RoleCheck()
    }, [router]);

    return (
        <div>
            {isAdmin ? (
                <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-roboto-mono)] text-lg">
                    <Header/>
                    <label className='grid place-content-center text-4xl pb-9 mt-28'>NAME</label>
                    <div className='bg-[#1C6758] grid place-content-center'>
                        <div className='w-[1300px] grid grid-cols-2'>
                            <a href='/user/info' className='rounded-lg py-4 text-center hover:scale-90 text-2xl bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 m-1 mr-2'>Личная информация</a>
                            <a href='/user/bookings' className='rounded-lg py-4 text-center hover:scale-90 text-2xl bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 m-1 ml-2'>Мои брони</a>
                        </div>
                    </div>
                    {children}
                    <Footer/>
                </div>
            ) : null}
        </div>
    );
};

export default Layout;