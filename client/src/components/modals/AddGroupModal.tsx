"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import Select from "react-select";
import { Button } from "../ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import useUserQuery from "@/hooks/useUserQuery";
import useUserScroll from "@/hooks/useUserScroll";
import axios, { AxiosError } from "axios";
import { HOST } from "@/utils/constaints";
import toast from "react-hot-toast";



const AddGroupModal = () => {
    const { open, onClose, type } = useModalStore();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = open && type === "ADD_GROUP_MODAL";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const {
        data: userData,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        hasPreviousPage
    } = useUserQuery({
        queryKey: "users",
    });

    useUserScroll({
        userRef: null,
        loadMoreTop: fetchPreviousPage,
        loadMoreBottom: fetchNextPage,
        shouldLoadMore:
            !isFetchingNextPage &&
            !isFetchingPreviousPage &&
            (!!hasNextPage || !!hasPreviousPage),
        isFetchingNextPage: isFetchingNextPage || isFetchingPreviousPage,
    });

    const members = watch("members");

    const users = userData?.pages?.flatMap((page: any) => page.users) || [];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            await axios.post(`${HOST}/api/conversations`, {
                title: data.name,
                isGroup: true,
                otherUsers: data.members.map((member: any) => member.value),
            }).then((callback) => {
                if (callback.status === 201) {
                    toast.success('Create susscessfully')
                } toast.error(callback.data)

            })
                ;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                const errorData = axiosError.response.data as { message: string}; 
                toast.error(errorData.message);
            } else {
                toast.error('An unexpected error occurred'); 
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    leading-7
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                Create a group chat
                            </h2>
                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-gray-600
                                    dark:text-zinc-400
                                "
                            >
                                Create a chat with more than 2 people
                            </p>
                            <div className="mt-10 flex flex-col gap-y-8">
                                <Input
                                    {...register("name")}
                                    id="name"
                                    disabled={isLoading}
                                    placeholder="Group Name"
                                    required
                                />

                                <Select
                                    isMulti
                                    options={users.map((user: any) => ({
                                        value: user._id, // Use _id as value
                                        label: `${user.firstName} ${user.lastName}`, // Display firstName and lastName
                                    }))}
                                    onChange={(value) => setValue("members", value, { shouldValidate: true })}
                                    value={members}
                                    isDisabled={isLoading}
                                    placeholder="Select members"
                                    // Disable selected options from being reselected
                                    isOptionDisabled={(option) =>
                                        members.some((member: any) => member.value === option.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button disabled={isLoading} onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddGroupModal;
