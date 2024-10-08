import Footer from "@/components/LK/footer"
import Header from "@/components/LK/header"

export default function HomePage() {
    return (
    <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-roboto-mono)] text-lg">
      <Header/>
      <label className='grid place-content-center text-4xl pb-9'>NAME</label>
      <div className='bg-[#1C6758] grid place-content-center'>
        <div className='w-[1300px] grid grid-cols-2'>
          <a className='py-4 text-center hover: scale-30 hover:bg-[#3D8361] duration-300'>Личная информация</a>
          <a className='py-4 text-center hover: scale-30 hover:bg-[#3D8361] duration-300'>Мои брони</a>
        </div>
      </div>
      <Footer/>
    </div>
    )
}