import { useModalStore } from "@/hooks/useModalStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import { HOST } from "@/utils/constaints";

export function UploadFileModal() {
    const { open, onClose, type, data } = useModalStore();
    const isModalOpen: boolean = open && type === 'UPLOAD_FILE';

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append('conversationId', data?.conversationId )
        try {
            const response = await axios.post(`${HOST}/api/messages`, formData, {
              
                withCredentials: true
            });

           
            if (response.status === 201) {
                toast.success("Upload thành công!");
                onClose(); 
            }
        } catch (error) {
            toast.error("Upload thất bại! Vui lòng thử lại.");
        }
    };

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                uploadFile(file);
            }
        }
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                </DialogHeader>

                <div
                    {...getRootProps({
                        className: `relative h-40 w-full border-dashed border-2 ${isDragActive ? 'border-blue-500' : 'border-gray-300'} cursor-pointer flex items-center justify-center`
                    })}
                >
                    <input {...getInputProps()} />
                    <p>{isDragActive ? 'Thả file vào đây...' : 'Kéo thả file hoặc click để chọn file'}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
