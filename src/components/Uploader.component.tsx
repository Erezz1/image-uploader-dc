import { useState, useCallback, FC } from 'react';
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';

import { validFile } from '@/helpers';
import { uploadFile } from '@/services';

import styles from './uploader-component.module.scss';
import image from '../resources/image.80539fd7.svg';
import imageUp from '../resources/image-upload.svg';

const UploaderComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleUploadFile = async (file: File) => {
    setIsLoading(true);
    const url = await uploadFile(file);
    setUrl(url);
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      {
        isLoading ?
          <Loading /> :
          !url ?
            <Upload uploadFile={handleUploadFile} /> :
            <Uploaded imageUrl={url} />
      }
    </div>
  )
}

interface UploadProps {
  uploadFile: (file: File) => void;
}
const Upload: FC<UploadProps> = ({ uploadFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!validFile(acceptedFiles[0])) return;
    uploadFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop });

  return (
    <>
      <h2>Upload your image</h2>
      <p>File should be Jpeg, Png,...</p>

      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (<>
          <Image
            width="115"
            height="90"
            alt="drag-here-image"
            src={imageUp}
          />
          <p>Upload...</p>
        </>) : (<>
          <Image
            src={image}
            alt="upload-image"
          />
          <p>Drag & Drop your image here</p>
        </>)}
      </div>

      <p>Or</p>
      <button onClick={open}>Choose a file</button>
    </>
  )
}

const Loading = () => (
  <>
    <h3 style={{ alignSelf: 'flex-start' }}>
      Uploading...
    </h3>
    <span className={styles.loader}></span>
  </>
)

interface UploadedProps {
  imageUrl: string;
}
const Uploaded: FC<UploadedProps> = ({ imageUrl }) => {
  const handleCopyUrl = () => navigator.clipboard.writeText(imageUrl);

  return (
    <>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        check_circle
      </span>
      <h2>Uploaded Successfully!</h2>
      <img
        className={styles.image}
        src={imageUrl}
        alt="image-uploaded"
      />
      <div className={styles.text}>
        {imageUrl}
        <button
          className={styles.copy}
          onClick={handleCopyUrl}
        >
          Copy Link
        </button>
      </div>
    </>
  )
}

export default UploaderComponent;
