"use client"
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getJwt } from "@/utils/auth/getJwt";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation"
import { useEffect } from 'react';

const LogoutPage = () => {
  const router = useRouter();

    useEffect(() => {
        async function TokenCheck (){
            let accessToken = (await getJwt()).access
            let refreshToken = (await getJwt()).refresh
            if (!refreshToken) {
              router.push('/signin')
            } else {
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            await fetch('http://localhost:3001/auth/logout', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .catch(error => {
              console.error('Error:', error);
              router.push('/');
            });
            router.push('/home')
            }
        }
        TokenCheck()
    }, [router]);
  return (
    <div className='bg-cover'>
      <Header />
      <main className="grid justify-items-center">
        <div>
          <button type="button" className="m-[300px] inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className='text-2xl'>Загрузка...</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LogoutPage;
