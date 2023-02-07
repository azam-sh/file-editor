import { useState, useEffect } from "react";
import { File } from "./models";
import FileList from "./components/FileList/FileList";
import Editor from "./components/Editor/Editor";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getFiles = () => {
    fetch("http://localhost:5000/files")
      .then((response) => response.json())
      .then((data) => setFiles(data));
  };

  useEffect(() => {
    getFiles();
  }, []);

  const changeFileContent = (value: string) => {
    if (selectedFile) {
      setFiles(
        files.map((file) => {
          if (file.id === selectedFile.id) {
            return { ...file, content: value };
          }
          return file;
        })
      );
      setSelectedFile({ ...selectedFile, content: value });
    }
  };

  
  return (
    <div className="flex fixed h-screen w-screen text-slate-800">
      <FileList
        files={files}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        setFiles={setFiles}
      />
      {selectedFile ? (
        <Editor
          selectedFile={selectedFile}
          changeFileContent={changeFileContent}
        />
      ) : (
        <div className="absolute top-[30%] left-[45%] rounded-[10px] bg-white text-center py-[20px] px-[40px] w-[300px] text-[20px] z-30">
          Choose file from list
        </div>
      )}
    </div>
  );
}

export default App;
