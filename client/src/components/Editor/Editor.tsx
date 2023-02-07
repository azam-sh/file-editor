import React from "react";
import { File } from "../../models";

const Editor = ({
  selectedFile,
  changeFileContent,
}: {
  selectedFile: File;
  changeFileContent: (value: string) => void;
}) => {
  
  const onEditingFile = () => {
    fetch(`http://localhost:5000/files/${selectedFile.id}`, {
      method: "PUT",
      body: JSON.stringify(selectedFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="min-h-full w-[87%]">
      <textarea
        className="min-h-full min-w-full text-[20px] p-[10px] focus:outline-none bg-[#9cb9d1]"
        value={selectedFile.content}
        onChange={(e) => changeFileContent(e.target.value)}
        onKeyUp={onEditingFile}
      />
    </div>
  );
};

export default Editor;
