"use client"
import Header from '@/components/header'
import Footer from '@/components/LK/footer'
import { setCookie } from 'cookies-next'
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormStateSignIn{
  fullname: string;
  email:string;
  phone:string;
  password:string;
}

export default function SigninPage() {
  const {register, handleSubmit} = useForm<IFormStateSignIn>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormStateSignIn>= async (data) => {
    setLoading(true);
    const response = await fetch('http://localhost:3001/auth/signup', {
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
    });
  }
  return (
    <div>
      <Header/>
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
          <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center grid space-y-4">
            <h1 className="mb-3 text-center text-2xl mt-32">Регистрация</h1>
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='ФИО' type='name' {...register('fullname', { required: true })} />
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='Почта' type='email' {...register('email', { required: true })} />
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder="Номер телефона" type='tel' {...register('phone', {required:true})}/>
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='Пароль' type="password"{...register('password', {required: true})} />
            <button  type="submit" className="bg-[#3D8361] rounded-md px-5 py-2 mt-6 text-xl hover: hover:scale-102 hover:bg-[#2F6A4E] duration-300 text-white">Зарегистрироваться</button>
          </form>
					<a href='/signin' className='mt-2 mb-28'>Уже есть аккаунт?</a>
        </div>
      )}
      </main>
      <Footer/>
    </div>
  );
}