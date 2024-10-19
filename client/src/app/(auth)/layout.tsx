'use client';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import { getJwt } from '@/utils/auth/getJwt';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [hasTokens, setHasTokens] = useState(true);

    useEffect(() => {
        async function TokenCheck (){
            let refreshToken = (await getJwt()).refresh
            if (!refreshToken) {
                setHasTokens(false);
            } else {
                setHasTokens(true);
                router.push('/adminID');
            }
        }
        TokenCheck()
    }, [router]);

    return (
        <div style={{height:'100vh'}}>
            {hasTokens ? null : children}
        </div>
    );
};

export default Layout;