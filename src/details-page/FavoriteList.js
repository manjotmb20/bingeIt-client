import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";
import Container from "./Container";
import favoriteApi from "./api/favorite.api";
import { removeFavorite } from "./userSlice";
import { useSelector, useDispatch } from 'react-redux';

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {

    console.log("onRemove", media);
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({ favoriteId: media.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (<>
    <MediaItem media={media} mediaType={media.mediaType} />
    <LoadingButton
      fullWidth
      variant="contained"
      sx={{ marginTop: 2 }}
      startIcon={<DeleteIcon />}
      loadingPosition="start"
      loading={onRequest}
      onClick={onRemove}
    >
      remove
    </LoadingButton>
  </>);
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
            const  user  = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {





      const { response, err } = await favoriteApi.getList();

      console.log("user._id: ", user);
      response.filter((e) => e.userId === user._id);
      console.log("here in get favorites");
      console.log("response: ", response);


    const filteredResponse = response.filter((e) => e.userId === user._id);
    console.log("filteredResponse: ", filteredResponse);


      if (err) toast.error(err.message);
      if (response) {
        setCount(filteredResponse.length);
        setMedias([...filteredResponse]);
        setFilteredMedias([...filteredResponse].splice(0, skip));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  console.log("user: ", user);

  return (
    <Box sx={{ maxWidth: "1366px",
                     margin: "auto",
                     padding: 2 }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;