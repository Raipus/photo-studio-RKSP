import Footer from "@/components/footer"
import Header from "@/components/header"
import Image from "next/image"
import Link from 'next/link'

export default function HomePage() {
    return (
    <div className="items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-roboto-mono)] text-lg">
      <Header/>
      <div className="flex min-w-full dark:bg-[#111111] bg-[#EEF2E6] h-[870px] items-center justify-center">
        <div className="flex justify-between w-[1300px] h-auto pt-16 pb-24">
          <div className="w-[600px] h-auto">
            <div className="animate-[slideRightEnter_1s_ease-in-out] font-[family-name:var(--font-inter)] font-bold text-6xl leading-tight mt-10">
              Создавайте Незабываемые Впечатления Уже Сегодня!
            </div>
            <div className="animate-[slideRightEnter_1.25s_ease-in-out] w-[300px] h-auto mt-10">
              Richard's Studios предлагает аренду студий для всех ваших потребностей в фото и видео съемке. 
            </div>
            <Link href='/loginPage'>
              <button className="animate-[slideRightEnter_1.5s_ease-in-out] mt-10 pt-3 pb-3 pl-11 pr-11 bg-[#3D8361] hover:bg-[#2F6A4E] duration-300 rounded-md text-white font-medium">Забронировать студию сейчас</button>
            </Link>
          </div>
          <div className="animate-[slideLeftEnter_1s_ease-in-out] w-[500px] h-[600px]">
            <Image
              src="/home1.jpg"
              alt="Изображение дома"
              width={500}
              height={600}
              quality={100}
              className="w-full h-full object-cover rounded-[3%]"
            />
          </div>
        </div>
      </div>
      <div id="about-us" className="flex min-w-full bg-[#1C6758] items-center justify-center text-white">
        <div className="w-[1300px] h-auto pt-14 pb-14 flex justify-between">
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">50+</div>
            <div className="text-center mt-4">Современного оборудования для получения потрясающих результатов фотосъемки.</div>
          </div>
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">100%</div>
            <div className="text-center mt-4">Квалифицированные рекомендации для безупречной фотосъемки.</div>
          </div>
          <div className="animate-[opacityEnter_1s_ease-in-out] flex flex-col items-center h-auto w-[335px]">
            <div className="font-[family-name:var(--font-inter)] font-bold text-5xl">100+</div>
            <div className="text-center mt-4">Индивидуальных макетов для универсальных фотосессий.</div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
    )
}