'use client'

import { getJwt } from '@/utils/auth/getJwt';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const Header = () => {
    const [hasTokens, setHasTokens] = useState(false);

    useEffect(() => {
        async function TokenCheck (){
            let refreshToken = (await getJwt()).refresh
            if (!refreshToken) {
                setHasTokens(false);
            } else {
                setHasTokens(true);
            }
        }
        TokenCheck()
    }, []);

    return (
        <div className="flex h-24 items-center justify-center dark:bg-[#111111] bg-[#EEF2E6] min-w-full transition-all duration-300 z-10">
            <div className="flex justify-between w-[1300px]">
                <div className="flex w-full justify-start items-center">
                    <a href="/home" className="font-[family-name:var(--font-inter)] font-bold text-2xl">Richard's Studios</a>
                </div>
                <div className="flex w-full justify-between items-center">
                    <div>
                        <a href="/home" className="p-4 mr-4">Главная</a>
                        <a href="/#about-us" className="p-4 mr-4">Cтудии</a>
                        <a className="p-4 mr-4">Фотографы</a>
                        <a className="p-4 mr-4">Контакты</a>
                    </div>
                    {hasTokens ? (
                        <Link href='/userID'>
                            <button className="pt-3 pb-3 pl-12 pr-12 bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 rounded-md text-white whitespace-nowrap">Личный кабинет
                            </button>
                        </Link>
                    ) : (
                        <Link href='/signin'>
                            <button className="pt-3 pb-3 pl-14 pr-14 bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 rounded-md text-white">Вход
                            </button>
                        </Link>
                )}
                </div>
            </div>
        </div>
    )
}

export default Header;