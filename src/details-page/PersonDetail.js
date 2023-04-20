import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import personApi from "./api/person.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  console.log("personId")
    console.log(id)

  useEffect(() => {
    const getPerson = async () => {
      const { response, err } = await personApi.detail({ id });

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
          <Box sx={{ maxWidth: "1366px",
                           margin: "auto",
                           padding: 2 }}>
            <Box sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" }
            }}>
              <Box sx={{
                width: { xs: "50%", md: "20%" }
              }}>
                <Box sx={{
                  paddingTop: "160%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${person.profile_path})`,
                }} />
              </Box>
              <Box sx={{
                width: { xs: "100%", md: "80%" },
                padding: { xs: "1rem 0", md: "1rem 2rem" }
              }}>
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700" color= "white">
                    {`${person.name} (${person.birthday && person.birthday.split("-")[0]}`}
                    {person.deathday && ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ textAlign: "justify",
                                          display: "-webkit-box",
                                          overflow: "hidden",
                                          color: "white",
                                          WebkitBoxOrient: "vertical",
                                          WebkitLineClamp: 10 }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>

          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;