import { X } from 'lucide-react';
import { useDropzone, Accept } from 'react-dropzone';

interface FileUploadProps {
    type: 'image' | 'file';
    value: File | null | string;
    onChange: (value: File | null) => void;
}

const FileUpload = ({ type, value, onChange }: FileUploadProps) => {

    const accept: Accept = type === 'image' ? { 'image/*': [] } : { '*/*': [] };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                onChange(file);
            }
        }
    });



    const handleRemove = () => {
        onChange(null);
    };



    return (
        <div
            {...getRootProps({
                className: `relative h-20 w-20 ${isDragActive ? 'border-blue-500' : 'border-gray-300'} ${!value && 'rounded-lg border-2 border-dashed'} cursor-pointer flex items-center justify-center`
            })}
        >
            <input {...getInputProps()} />
            {value ? (
                <div className="relative h-full w-full flex items-center justify-center">
                    {typeof value === "string" ? (
                        <img
                            src={value}
                            alt="Uploaded"
                            className="rounded-full border border-zinc-400 h-full w-full object-cover"
                        />
                    ) : (
                        <img
                            src={URL.createObjectURL(value)}
                            alt="Uploaded"
                            className="rounded-full border border-zinc-400 h-full w-full object-cover"
                        />
                    )}
                    <button
                        onClick={handleRemove}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="text-gray-500 text-[10px] text-center">
                    {'Drop the file here...'}
                </div>
            )}

        </div>
    );
};

export default FileUpload;
