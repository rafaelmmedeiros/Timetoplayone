import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import PhotoUploadWidget from "../../../../app/common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rooStore = useContext(RootStoreContext);
  const { profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, deletePhoto, loading } = rooStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>

        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Fotos" />
          {isCurrentUser && (
            <Button
              basic
              floated="right"
              color={addPhotoMode ? "red" : "blue"}
              content={addPhotoMode ? "Cancelar" : "Adicionar Foto"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
          ) : (
            <Card.Group stackable itemsPerRow={5}>
              {profile &&
                profile?.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={3}>
                        <Button
                          name={photo.id}
                          basic
                          color="yellow"
                          icon="star"
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          disabled={photo.isMain}
                          loading={loading && target === photo.id}
                        ></Button>
                        <Button disabled={photo.isMain} basic color="blue" icon="crop"></Button>
                        <Button
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={loading && deleteTarget === photo.id}
                          name={photo.id}
                          disabled={photo.isMain}
                          basic
                          negative
                          icon="trash"
                        ></Button>
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
        
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
