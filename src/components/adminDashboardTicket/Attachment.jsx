import React, { useState } from 'react';
import uploadIcon from '../../assets/download.svg';  // Placeholder for arrow upload logo
import deleteIcon from '../../assets/delete.svg';  // Placeholder for delete logo
import fileIcon from '../../assets/PDF.svg'; // Placeholder for file icon

function AttachmentSection() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleFileDelete = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
  };

  return (
    <div>
      <h2 className="text-left text-xl font-normal mb-4">Attachment</h2>

      <section className="p-4 rounded-lg bg-blue-100 border-blue-300">
        <div className="flex justify-end">
          <label className="flex items-center space-x-2 cursor-pointer">
            <img src={uploadIcon} alt="Upload" className="h-6 w-6" />
            <span>Upload File</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </label>
        </div>

        <ul className="list-none p-0">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between bg-white p-2 rounded-lg mb-2 border border-gray-200">
              <div className="flex justify-center border border-red-200">
                {/* <img src={fileIcon} alt="File" className="h-8 w-8" /> */}
                {/* <span>{file.name}</span> */}
              </div>
              {/* <button
                className="flex items-end space-x-2"
                onClick={() => handleFileDelete(file)}
              >
                <img src={deleteIcon} alt="Delete" className="h-6 w-6" />
                <span className="text-blue-600">Delete</span>
              </button> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AttachmentSection;
