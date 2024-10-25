


import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'


const SignOut = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string;
}) => {

    const onClick = async () => {
       try {
        const res = await axios.post('http://localhost:8080/api/auth/logout')
        if(res.status === 200) {
            toast.success('Logged out')
            location.reload()
        }
       } catch (error) {
        console.log(error)
       }
    }

    return (
        <Button onClick={onClick} className={className}>
            {children}
        </Button>
    )
}

export default SignOut