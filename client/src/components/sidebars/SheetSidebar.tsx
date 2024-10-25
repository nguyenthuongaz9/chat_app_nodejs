


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/hooks/useAuthStore"
import { useModalStore } from "@/hooks/useModalStore"
import { HOST } from "@/utils/constaints"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import FileUpload from "../FileUpload"

type FormValues = {
    firstName: string;
    lastName: string;
};
export function SheetSidebar() {
    const { type, open, onClose } = useModalStore()

    const isModalOpen = open && type === 'SHEET_SIDEBAR';
    const { user, setUser } = useAuthStore();

    const { register, setValue, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const [file, setFile] = useState<File | string | null>(null);

    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName || "");
            setValue("lastName", user.lastName || "");
            setFile(user.imageUrl || null);
        }
    }, [user, setValue]);

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData()
        if (data.firstName === user.firstName && data.lastName === user.lastName && file === user.imageUrl) {
            onClose()
        }
        if (data.firstName !== user.firstName) {
            formData.append('firstName', data.firstName)
        }
        if (data.lastName !== user.lastName) {
            formData.append('lastName', data.lastName)
        }
        if (file && file !== user.imageUrl) {
            formData.append('image', file)
        }



        await axios.post(`${HOST}/api/users/${user.id}`, formData)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Profile updated successfully');
                    setUser(res.data);
                  
                } else {
                    toast.error('Error updating profile');
                }
            })
            .finally(() => {
                location.reload();
            });


    };


    return (
        <Sheet open={isModalOpen} onOpenChange={onClose}>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <FileUpload
                            type="image"
                            value={file}
                            onChange={setFile}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            className="col-span-3"
                        />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>

                </form>

            </SheetContent>
        </Sheet>
    )
}


