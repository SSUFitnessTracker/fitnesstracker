import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

function SetupAccountForm(props) {
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = useSelector((state) => state.token);

  const handleHeightChange = (e) => {
    setUserHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setUserWeight(e.target.value);
  };

  let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let sleepFunction = async () => {
    await sleep(5000);
  };

  let setupAccount = async () => {
    try {
      if (userHeight === "" || userWeight === "") {
        setError("Please enter both height and weight.");
        return;
      }
      console.log(token);
      const res = await axios.patch(
        "/user/setUserFitness",
        { height: userHeight, weight: userWeight },
        { headers: { Authorization: token } }
      );
      console.log(res);
      setError("");
      setSuccess("Success! Your height and weight has been set");
      props.closeSetupForm();
    } catch (e) {
      console.log(e.response.data.msg);
    }
  };

  useEffect(()=> {
    setupAccount();
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          paddingTop: "1px",
          paddingBottom: "20px",
        }}>
        <CloseIcon
          style={{ alignSelf: "flex-end", cursor: "pointer" }}
          onClick={props.closeSetupForm}
        />

        <div>
          <Container>
            <Stack spacing={2}>
              <h1 style={{ fontSize: "20px" }}>
                Please enter the following details:
              </h1>
              <h1
                style={{ color: "red", fontSize: "12px", marginLeft: "50px" }}>
                {error}
              </h1>
              <h1
                style={{ color: "blue", fontSize: "12px", marginLeft: "30px" }}>
                {success}
              </h1>
              <TextField
                style={{ width: "150px", marginLeft: "75px" }}
                label="Height (in)"
                variant="outlined"
                value={userHeight}
                onChange={handleHeightChange}
              />
              <TextField
                style={{ width: "150px", marginLeft: "75px" }}
                label="Weight (lbs)"
                variant="outlined"
                value={userWeight}
                onChange={handleWeightChange}
              />
            </Stack>
          </Container>
          <Container>
            <Button
              variant="contained"
              size="medium"
              style={{ marginLeft: "105px", marginTop: "12%" }}
              onClick={setupAccount}>
              Done
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default SetupAccountForm;
