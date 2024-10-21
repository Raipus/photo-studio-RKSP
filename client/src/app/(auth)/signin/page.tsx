"use client"
import Header from '@/components/header'
import Footer from '@/components/LK/footer'
import Link from "next/link"
import {deleteCookie, setCookie} from "cookies-next";
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from 'react';

interface IFormStateLogin{
  email: string;
  password: string;
}

export default function LoginPage() {
  const {register, handleSubmit} = useForm<IFormStateLogin>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit: SubmitHandler<IFormStateLogin> = async (data) => {
    setLoading(true);
    await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json()).then(data1 => {
      setCookie('access_token', data1.accessToken,{maxAge:60*15});
      setCookie('refresh_token', data1.refreshToken,{maxAge:60*60*24*7});
      router.push('/userID')
    })
    .catch(error => {
      console.error('Error:', error);
      deleteCookie('access_token');
      deleteCookie('refresh_token');
    });
  }
  return (
    <div className='bg-cover'>
      <Header />
      <main className="grid justify-items-center">
        {loading ? (
          <div>
            <button type="button" className="m-[300px] inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className='text-2xl'>Загрузка...</p>
            </button>
          </div>
        ) : (
        <div className="m-10 grid justify-items-center">
          <h1 className="justify-self-center mb-3 mt-32 text-2xl">Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center grid space-y-4">
              <input className="rounded-md text-black border-black border-[1px] p-1" placeholder='Почта' type='email' {...register('email', { required: true })} />
              <input className="rounded-md text-black border-black border-[1px] p-1" placeholder='Пароль' type="password" {...register('password', { required: true })} />
              <button type="submit" className="bg-[#3D8361] rounded-md px-5 py-2 mt-20 text-xl hover:scale-102 hover:bg-[#2F6A4E] duration-300 text-white">Вход</button>
            </form>
          <Link href="http://localhost:3000/signup" className="mt-3 mb-52">Регистрация</Link>
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}
