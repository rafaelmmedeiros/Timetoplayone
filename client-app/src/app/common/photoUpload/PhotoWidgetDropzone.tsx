import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px",
};

const dropzoneActive = {
  borderColor: "teal",
};

const PhotoWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      //console.log(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}>
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Arrastar foto"></Header>
    </div>
  );
};

export default PhotoWidgetDropzone;
