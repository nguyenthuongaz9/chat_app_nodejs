import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FileUpload from '@/components/FileUpload';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/hooks/useAuthStore';
import axios from 'axios';
import { HOST } from '@/utils/constaints';
import toast from 'react-hot-toast';

const SetupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore()
  const { formState: { errors }, register, control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      file: null,
    }
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('file', data.file);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    })

    const response = await axios.post(`${HOST}/api/users`, formData, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUser(response.data.user);
      setIsLoading(false);
      toast.success('Created Successfully')
    } else {
      setIsLoading(false);
      toast.error('Error creating profiles')
      console.error('Error:', response.data);
    }


  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {isLoading && (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-white" />
        </div>
      )}

      <form
        className="space-y-10 bg-[#2f333e] p-10 rounded-md md:w-[35rem] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <label htmlFor="file" className="font-semibold text-white">Image</label>
          <div className='flex items-center justify-center'>
            <Controller
              name="file"
              control={control}
              rules={{ required: 'Image is required' }} 
              render={({ field: { value, onChange } }) => (
                <FileUpload
                  type="image"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

          </div>
          <p className="text-xs text-rose-500">{errors.file?.message}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="firstName" className="font-semibold text-white">First Name</label>
          <Input
            type="text"
            disabled={isLoading}
            {...register('firstName', {
              required: 'FirstName is required',
            })}
            className="w-full rounded-md bg-white"
            placeholder="Enter your first name"
          />
          <p className="text-xs text-rose-500">{errors.firstName?.message}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="font-semibold text-white">Last Name</label>
          <Input
            type="text"
            disabled={isLoading}
            {...register('lastName', {
              required: 'LastName is required',
            })}
            className="w-full rounded-md bg-white"
            placeholder="Enter your last name"
          />
          <p className="text-xs text-rose-500">{errors.lastName?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SetupPage;
