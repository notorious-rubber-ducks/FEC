import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../../hooks/context';

const UploadFile = () => {
  const context = useContext(AppContext);
  const [fileDir, setFileDir] = useState([]);
  const [fileDirLength, setFileDirLength] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    context.setImageDirs([...context.imageDirs, fileDir]);
    setFileDirLength(fileDirLength + 1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFileDir(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" id="myFile" name="filename" value={fileDir} onChange={handleChange} />
        {fileDirLength === 5 ? null : <button>Upload</button>}
      </form>
    </div>
  );
};

export default UploadFile;
