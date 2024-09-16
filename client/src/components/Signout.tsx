


import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Signout = ({
    children
}: {
    children: React.ReactNode
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
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}

export default Signout