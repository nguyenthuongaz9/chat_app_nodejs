// File: index.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/hooks/useAuthStore";
import axios from "axios";
import { useForm } from "react-hook-form";

const Verify = () => {
  

  const { user } = useAuthStore()

  const { register, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const onClick = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/resend-verification-code', {
        email:user?.email,
      },{
        withCredentials: true
      })
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify-email',{
        email: user?.email,
        code: data.code
      })    
      
      if(res.status === 200){
        location.reload()
      }

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-[#2e333d] rounded-md shadow-lg md:w-[35rem] w-full p-4 space-y-10'>
      <h1 className="text-center font-bold text-white">Verify Email</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          {...register('code', {
            required: true
          })}
          placeholder="Enter code..."
        />
        {errors.code && <span className="text-rose-500">This field is required</span>}



        <Button>
          Verify
        </Button>
        <p onClick={onClick} className="text-zinc-400 hover:text-zinc-200 transition self-end cursor-pointer">Resend the code</p>

      </form>
    </div>
  );
}

export default Verify;
