"use client"
import Header from '@/components/header'
import Footer from '@/components/LK/footer'
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormStateSignIn{
  name: string;
  password:string;
  email:string;
  phone:string;
}

export default function SigninPage() {
  const {register, handleSubmit} = useForm<IFormStateSignIn>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormStateSignIn>= async (data) => {
    console.log("отправляю данные")
      try {
        const response = await fetch('http://localhost:3001/requests', {
          method: 'POST',
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
      router.push("http://localhost:3000/workspace/map");
  }
  return (
    <div>
      <Header/>
      <main className="grid justify-items-center">
        <div className="m-10 grid justify-items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center grid space-y-4">
            <h1 className="mb-3 text-center text-2xl mt-32">Регистрация</h1>
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='ФИО' type='name' {...register('name', { required: true })} />
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='Пароль' type="password"{...register('password', {required: true})} />
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder='Почта' type='email' {...register('email', { required: true })} />
            <input className ="rounded-md text-black border-black border-[1px] p-1" placeholder="Номер телефона" type='number'{...register('phone', {required:true})}/>
            <button  type="submit" className="bg-[#3D8361] rounded-md px-5 py-2 mt-6 text-xl hover: hover:scale-102 hover:bg-[#2F6A4E] duration-300 text-white">Зарегистрироваться</button>
          </form>
					<a href='/loginPage' className='mt-2 mb-28'>Уже есть аккаунт?</a>
        </div>
      </main>
      <Footer/>
    </div>
  );
}