import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Container from "./Container";
import reviewApi from "./api/review.api";
import  {Link}  from "react-router-dom";
import TextAvatar from "./TextAvatar";
import './movie.css';

const ReviewItem = ({ review, onRemoved }) => {
  const newUser = {
        displayName: "manjot1234",
        id: "643d9a4bc7505a8c239555c6",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjQzZDlhNGJjNzUwNWE4YzIzOTU1NWM2IiwiaWF0IjoxNjgxNzY3ODQyLCJleHAiOjE2ODE4NTQyNDJ9.KYczeUXCdTDKpuaM4e2M00E-4YpgbEOaIykMCNZroGU",
        username: "manjot1234",
        _id: "643d9a4bc7505a8c239555c6",
      };

            const user  = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);
  };

  console.log("review and user: ", review, user)

  console.log(review.id)

  return (
    <Box sx={{
      padding: 2,
      borderRadius: "5px",
      position: "relative",
      opacity: onRequest ? 0.6 : 1,
      "&:hover": { backgroundColor: "background.contrast" }
    }}>
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
             <Typography variant="h6" fontWeight="700" color="white">
                {review.userId ? (
                  <Link
                    to={`/profile/${review.userId}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {review.author}
                  </Link>
                ) : (
                  <span>{review.author}</span>
                )}
              </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user.loggedIn === "true" && user._id === review.userId && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
                color:  "white",
                backgroundColor: "red",
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const newUser = {
        displayName: "manjot123",
        id: "643d9a4bc7505a8c239555c6",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjQzZDlhNGJjNzUwNWE4YzIzOTU1NWM2IiwiaWF0IjoxNjgxNzY3ODQyLCJleHAiOjE2ODE4NTQyNDJ9.KYczeUXCdTDKpuaM4e2M00E-4YpgbEOaIykMCNZroGU",
        username: "manjot123",
        _id: "643d9a4bc7505a8c239555c6",
      };

            const user  = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  console.log("reviews:123 ", reviews.length);
  console.log("reviews:1234 ", user)
        console.log("reviews123456 ", filteredReviews);



  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      userId: user ? user._id : null,
      author: user.username,
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path
    };

    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review success");

      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex(e => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review success");

  };


  console.log("reviews1234567", (filteredReviews ? filteredReviews : []))



  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {user.loggedIn === "true" && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                <Link to={`/profile/${user.id}`} style={{textDecoration: "none", color: "white"}} >
                    {user.displayName}
                </Link>
                </Typography>
                <TextField
                  className="custom-text-field"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}

                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;