import React, { useState } from "react";
import { File } from "../../models";
import { AiOutlineDelete } from "react-icons/ai";
import FileCreate from "../FileCreate/FileCreate";

const FileList = ({
  files,
  setSelectedFile,
  selectedFile,
  setFiles,
}: {
  files: File[];
  setSelectedFile: (file: File) => void;
  selectedFile: File | null;
  setFiles: (arr: File[]) => void;
}) => {
  const [isHovering, setHoveringState] = useState<number | null>(null);

  const handleMouseOver = (id: number) => {
    setHoveringState(id);
  };

  const handleMouseOut = () => {
    setHoveringState(null);
  };

  const deleteFile = (id: number) => {
    setFiles(
      files.filter((file) => {
        return file.id !== id;
      })
    );
    fetch(`http://localhost:5000/files/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="flex flex-col justify-between bg-slate-200 min-h-full w-[13%]">
      <div className="flex flex-col">
        {files.map((file) => {
          return (
            <div
              className={`flex justify-between items-center cursor-pointer rounded-[10px] py-[5px] px-[10px] min-h-[40px] text-[18px] mx-[10px] mt-[5px] break-words ${
                isHovering === file.id ||
                (selectedFile && selectedFile.id === file.id)
                  ? "bg-blue-200"
                  : "bg-transparent"
              } `}
              key={file.id}
              onMouseOver={() => handleMouseOver(file.id)}
              onMouseOut={handleMouseOut}
              onClick={() => setSelectedFile(file)}
            >
              <span>{file.name}</span>
              {isHovering === file.id && (
                <button
                  onClick={() => deleteFile(file.id)}
                  className="hover:text-red-800 mr-[10px] p-[3px] flex items-center justify-center cursor-pointer text-[19px]"
                >
                  <AiOutlineDelete />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <FileCreate
        files={files}
        setFiles={setFiles}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
};

export default FileList;
