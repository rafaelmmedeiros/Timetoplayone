import React, { Fragment, useState, useEffect } from "react";
import { Header, Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({ loading, uploadPhoto }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (

    <Fragment>

      <Grid stackable>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Adicionar Foto" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Redimensionar" />
          {files.length > 0 && <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Revisar" />
          {files.length > 0 && (
            <Fragment>
              <div className="img-preview" style={{ minHeight: "200px", overflow: "hidden" }} />
              <Button.Group widths={1}>
                <Button content="Salvar" positive icon="check" loading={loading} onClick={() => uploadPhoto(image!)} />
                <Button.Or />
                <Button content="Cancelar" icon="close" disabled={loading} onClick={() => setFiles([])} />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

    </Fragment>

  );
};

export default observer(PhotoUploadWidget);
