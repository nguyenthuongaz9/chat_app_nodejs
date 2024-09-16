import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { useAuthStore } from "@/hooks/useAuthStore"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
const Auth = () => {

    const { login, signup } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const { formState: { errors }, register, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const [variant, setVariant] = useState("LOGIN")


    const toggleVariant = () => {
        setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN")
    }

    const onSubmit = async (data: any) => {
        console.log(data);
        setIsLoading(true)
        try {
            if (variant === "LOGIN") {
                const response = await login(data.email, data.password);
                if (response.status === 200) {
                    toast.success("Logged in")
                    navigate('/')
                }
                
            } else {
                const response = await signup(data.email, data.password);
                if (response.status === 200) {
                    toast.success("Register Successfully")
                    navigate('/')
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Error submitting form");
        }
        setIsLoading(false)
    };



    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            {isLoading && (
                <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
                    <Loader2 size={40} className="animate-spin text-white" />
                </div>
            )}
            <div className="space-y-10 bg-[#2f333e] p-10 rounded-md md:w-[35rem] w-full">
                <h3 className="font-bold text-2xl text-center text-white">
                    {variant === "LOGIN" ? "Sign in to your account" : "Register for an account"}
                </h3>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <div className="space-y-2">
                        <label htmlFor="email" className="font-semibold text-white">Email</label>
                        <Input
                            type="email"
                            disabled={isLoading}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Email is not valid'
                                }
                            })}
                            className="w-full rounded-md bg-white"
                            placeholder="Enter your email"
                        />
                        <p className="text-xs text-rose-500">{errors.email?.message}</p>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="font-semibold text-white">Password</label>
                        <Input
                            type="password"
                            disabled={isLoading}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                            className="w-full rounded-md bg-white "
                            placeholder="Enter your password"
                        />
                        <p className="text-xs text-rose-500">{errors.password?.message}</p>
                    </div>
                    {variant === "REGISTER" && (
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="font-semibold text-white">Confirm Password</label>
                            <Input
                                type="password"
                                disabled={isLoading}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value => value === getValues('password') || 'Passwords do not match'
                                })}
                                className="w-full rounded-md bg-white"
                                placeholder="Confirm your password"
                            />
                            <p className="text-xs text-rose-500">{errors.confirmPassword?.message}</p>
                        </div>
                    )}

                    <Button disabled={isLoading} className="w-full rounded-md bg-[#131313] hover:bg-[#131334] transition" type="submit">
                        {variant === "LOGIN" ? "Login" : "Signup"}
                    </Button>
                    <p className="text-center text-zinc-400">
                        {variant === "LOGIN" ? (
                            "Don't have an account? "
                        ) : (
                            "Already have an account? "
                        )}
                        <span onClick={toggleVariant} className="cursor-pointer text-white underline">
                            {variant === "LOGIN" ? "Create an account" : "Sign in"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Auth
