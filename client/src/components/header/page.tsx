'use client'

const Header = () => {
    return (
        <div className="flex absolute top-0 h-24 items-center justify-center bg-[#1D1D1CFF] min-w-full">
            <div className="flex justify-between w-8/12">
                <div className="flex w-full justify-start">
                    <p className="font-[family-name:var(--font-inter)] font-bold text-2xl">Richard's Photos</p>
                </div>
                <div className="flex w-full justify-end">Правый div</div>
            </div>
        </div>
    )
}

export default Header;