'use client'

const Header = () => {
    return (
        <div className="flex absolute top-0 h-24 items-center justify-center dark:bg-[#1D1D1CFF] bg-[#EEF2E6] min-w-full">
            <div className="flex justify-between w-[1300px]">
                <div className="flex w-full justify-start items-center">
                    <a href="/home" className="font-[family-name:var(--font-inter)] font-bold text-2xl">Richard's Photos</a>
                </div>
                <div className="flex w-full justify-between items-center">
                    <div className="ml-24">
                        <a href="/home" className="p-4 mr-1">Home</a>
                        <a className="p-4 mr-1">Features</a>
                        <a className="p-4 mr-1">Testimonials</a>
                        <a className="p-4 mr-1">Contact Us</a>
                    </div>
                    <button className="pt-3 pb-3 pl-11 pr-11 bg-[#3D8361] hover:bg-[#2F6A4E] rounded-[5%] text-white">Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default Header;