'use client';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import { getJwt } from '@/utils/auth/getJwt';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function RoleCheck (){
            let accessToken = (await getJwt()).access
            let refreshToken = (await getJwt()).refresh
            if (!refreshToken) {
                router.push('/signin')
            } else {
                await fetch('http://localhost:3001/auth/getUserInfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.role == 'admin') {
                        setIsAdmin(false);
                        router.push('/adminID');
                    } else if (data.role == 'user') {
                        setIsAdmin(true);
                        router.push('/userID');
                    } else if (data.role == 'photographer') {
                        setIsAdmin(false);
                        router.push('/');
                    } else {
                        setIsAdmin(false);
                        router.push('/');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    router.push('/');
                });
            }
        }
        RoleCheck()
    }, [router]);

    return (
        <div style={{height:'100vh'}}>
            {isAdmin ? children : null}
        </div>
    );
};

export default Layout;