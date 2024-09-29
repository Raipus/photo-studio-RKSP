'use client'

const Header = () => {
    return (
        <div className="flex h-24 items-center justify-center dark:bg-[#111111] bg-[#EEF2E6] min-w-full transition-all duration-300 z-10">
            <div className="flex justify-between w-[1300px]">
                <div className="flex w-full justify-start items-center">
                    <a href="/home" className="font-[family-name:var(--font-inter)] font-bold text-2xl">Richard's Studios</a>
                </div>
                <div className="flex w-full justify-between items-center">
                    <div>
                        <a href="/home" className="p-4 mr-1">Главная</a>
                        <a href="/#about-us" className="p-4 mr-1">Особенности</a>
                        <a className="p-4 mr-1">Отзывы</a>
                        <a className="p-4 mr-1">Контакты</a>
                    </div>
                    <button className="pt-3 pb-3 pl-11 pr-11 bg-[#3D8361] hover:bg-[#2F6A4E] rounded-[5%] text-white">Забронировать</button>
                </div>
            </div>
        </div>
    )
}

export default Header;