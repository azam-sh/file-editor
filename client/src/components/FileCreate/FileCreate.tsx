import { useState } from "react";
import { File } from "../../models";

const FileCreate = ({
  files,
  setFiles,
  setSelectedFile,
}: {
  files: File[];
  setFiles: (arr: File[]) => void;
  setSelectedFile: (file: File) => void;
}) => {
  const [isEditing, setEditingStatus] = useState(false);
  const [fileName, setFileName] = useState("");

  const createFile = () => {
    const newFile = {
      id: Math.random(),
      name: fileName,
      content: "",
    };
    fetch("http://localhost:5000/file-create", {
      method: "POST",
      body: JSON.stringify(newFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setFiles([...files, newFile]);
    setEditingStatus(false);
    setSelectedFile(newFile);
    setFileName("");
  };

  return (
    <>
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => setEditingStatus(!isEditing)}
          className="border-none bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded-[10px]"
        >
          + New File
        </button>
      </div>
      {isEditing && (
        <>
          <div
            onClick={() => setEditingStatus(false)}
            className="bg-black bg-opacity-60 fixed min-h-full min-w-full z-40"
          ></div>
          <div className="absolute top-[20%] left-[40%] py-[50px] px-[70px] z-50 bg-slate-200 rounded-[10px]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl">Create File</h2>
              <div className="flex items-center justify-center mt-[15px] pb-[30px] border-b-gray-400 border-b-[1px]">
                <span className="mr-[10px] mt-[10px] text-[17px]">
                  File name
                </span>
                <input
                  className="focus:outline-none mt-[10px] py-[5px] px-[10px] rounded-[10px]"
                  type="text"
                  onChange={(e) => setFileName(e.target.value)}
                  value={fileName}
                />
              </div>
              <div className="mt-[40px] flex justify-end min-h-full min-w-full">
                <button
                  onClick={() => setEditingStatus(false)}
                  className="mr-[10px] border-none bg-red-300 hover:bg-red-400 py-1 px-2 rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={createFile}
                  className="border-none bg-blue-300 hover:bg-blue-400 py-1 px-2 rounded-[10px]"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FileCreate;
