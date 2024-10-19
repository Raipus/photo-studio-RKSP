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
                        <a href="/#about-us" className="p-4 mr-1">Студии</a>
                        <a className="p-4 mr-1">Фотографы</a>
                        <a className="p-4 mr-1">Контакты</a>
						<a href='/userID' className="p-4 mr-1">Личный кабинет</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;