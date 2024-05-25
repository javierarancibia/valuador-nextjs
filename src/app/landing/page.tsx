import Link from 'next/link';
import React from 'react'

const Landing = () => {
    return (
        <>
            <div>Landing Page</div>
            <Link href="/api/auth/signin">Login</Link>
        </>
    )
}
export default Landing;