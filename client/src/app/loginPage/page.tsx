"use client"
import Header from '@/components/header'
import Footer from '@/components/LK/footer'
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormStateLogin{
  ID: number;
  email: string;
  password: string;
}

export default function LoginPage() {
  const {register, handleSubmit} = useForm<IFormStateLogin>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormStateLogin> = async (data) => {
    console.log("отправляю данные")
      try {
        const ApiUrl = 'http://localhost:3001/users/'+register('email')
        const response = await fetch(ApiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
      }
      const lk = 'http://localhost:3000/'+data.ID
      redirect(lk);
  }
  return (
    <div className=' bg-cover'>
      <Header/>
      <main className="grid justify-items-center">
        <div className="m-10 grid justify-items-center">
          <h1 className="justify-self-center mb-3 mt-32">Вход</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center grid space-y-4">
            <input placeholder='Почта' type='email' {...register('email', { required: true })} />
            <input placeholder='Пароль' type="password"{...register('password', {required: true})} />
            <button  type="submit" className="bg-[#3D8361] rounded-md px-5 py-2 mt-20 text-xl hover: hover:scale-102 hover:bg-[#1C6758] duration-300">Вход</button>
          </form>
        <Link href="http://localhost:3000/signPage" className="mt-3 mb-52">Регистрация</Link>
      </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
