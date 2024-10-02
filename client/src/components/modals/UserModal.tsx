import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useModalStore } from "@/hooks/useModalStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../FileUpload";
import axios from "axios";
import { HOST } from "@/utils/constaints";
import toast from "react-hot-toast";

type FormValues = {
    firstName: string;
    lastName: string;
};

export function UserModal() {
    const { open, type ,onOpen, onClose } = useModalStore();
    const { user, setUser } = useAuthStore();

    const { register, setValue, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const isModalOpen = open && type === 'USER_MODAL'
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
                console.log("Updated user data:", res.data);
            } else {
                toast.error('Error updating profile');
            }
        })
        .finally(() => {
            location.reload();
        });


    };


    return (
        <Dialog open={isModalOpen} onOpenChange={(e)=> onClose() }>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

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
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
