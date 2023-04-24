import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import personApi from "./api/person.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProfileDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  console.log("personId")
    console.log(id)

  useEffect(() => {
    const getPerson = async () => {
      const { response, err } = await personApi.userDetail({ id });

      console.log("response profile detail: ", response)

      console.log("response")
        console.log(response)

      if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [id]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box
            sx={{
              maxWidth: "1366px",
              margin: "auto",
              padding: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${person.profilePic})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700" color="white">
                    {person.username}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    DOB: {person.DOB}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Address: {person.address}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Age: {person.age}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Bio: {person.bio}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Email: {person.email}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Favourite Genre: {person.favouriteGenre || "Not specified"}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Gender: {person.gender}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Phone: {person.phone}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    Tagline: {person.tagline}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </>
      )}

      )}
    </>
  );
};

export default ProfileDetail;