'use client'

const Footer = () => {
    return (
        <div className="flex flex-col absolute bottom-0 h-auto items-center justify-center bg-[#FFFFFF] dark:bg-[#111111] w-full pt-24 pb-5">
            <div className="flex items-end justify-between w-[1300px] order-1 pb-[50px]">
                <p className="font-[family-name:var(--font-inter)] font-bold text-4xl w-[650px]">Unleash your creativity in our versatile studio spaces.</p>
                <button className="pt-3 pb-3 pl-11 pr-11 h-12 bg-[#3D8361] hover:bg-[#2F6A4E] rounded-[5%] text-white">Book Now</button>
            </div>
            <div className="flex items-center justify-start w-[1300px] order-2 pt-16 border-t-[1px] mt-1 border-gray-500">© Copyright 2024, All Rights Reserved.</div>
        </div>
    )
}

export default Footer;