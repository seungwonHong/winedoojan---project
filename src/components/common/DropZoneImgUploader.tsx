import { useDropzone } from "react-dropzone";

export default function DropZoneImageUploader({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onFileSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 text-center cursor-pointer rounded-lg bg-white shadow"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>파일을 여기에 놓아주세요!</p>
      ) : (
        <p>이미지를 드래그하거나 클릭해서 업로드하세요</p>
      )}
    </div>
  );
}
