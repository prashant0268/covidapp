import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import "./AddPolicy.scss";
import { countries } from "../../refData";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Divider,
  Input
} from "@material-ui/core";
import { withAuthenticator } from "aws-amplify-react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const addPolicy = `mutation createPolicy($title:String $country: String $state: String! $tweetId: String! $effectiveFrom: String) {
  createPolicy(input:{
    title:$title
    country:$country
    state:$state
    tweetId:$tweetId
    effectiveFrom:$effectiveFrom
  }){
    id
    title
    country
    state
    tweetId
    effectiveFrom
  }
}`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function AddPolicy() {
  const classes = useStyles();
  const policyMutation = async () => {
    const policyDetails = {
      title: title,
      country: country,
      state: state === "" ? "null" : state,
      tweetId: tweetId === "" ? "null" : tweetId,
      effectiveFrom: selectedDate.toDateString()
    };
    const newPolicy = await API.graphql(
      graphqlOperation(addPolicy, policyDetails)
    );
    alert("Policy Saved Successfully!");
    setTitle("");
  };

  const [country, setCountry] = useState(
    window.localStorage.getItem("add-country")
      ? window.localStorage.getItem("add-country")
      : ""
  );
  const [state, setState] = useState(
    window.localStorage.getItem("add-state")
      ? window.localStorage.getItem("add-state")
      : ""
  );
  const [tweetId, setTweetId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(selectedDate.toDateString());
  }, [selectedDate]);

  useEffect(() => {
    window.localStorage.setItem("add-country", country);
  }, [country]);
  useEffect(() => {
    window.localStorage.setItem("add-state", state);
  }, [state]);

  return (
    <Container>
      <div className="add-policy-container">
        <br />
        <Route
          render={({ history }) => (
            <KeyboardBackspaceIcon
              onClick={() => {
                history.push("/");
              }}
            />
          )}
        />
        <br />
        <br />
        <Card>
          <CardHeader title="Add new policy announcement"></CardHeader>
          <Divider></Divider>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={country}
                    onChange={evt => {
                      setCountry(evt.target.value);
                      setState("");
                    }}
                  >
                    {countries.map(c => (
                      <MenuItem value={c.country}>{c.country}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>State</InputLabel>
                  <Select
                    disabled={country === ""}
                    value={state}
                    onChange={evt => setState(evt.target.value)}
                  >
                    {country &&
                      countries
                        .find(cnt => cnt.country === country)
                        .states.map(s => <MenuItem value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Announced Date"
                    value={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="policy-title">Policy Title</InputLabel>
                  <Input
                    id="policy-title"
                    value={title}
                    label="Policy Title"
                    onChange={evt => setTitle(evt.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="policy-tweet-id">Tweet Id</InputLabel>
                  <Input
                    id="policy-tweet-id"
                    value={tweetId}
                    label="Tweet Id"
                    onChange={evt => setTweetId(evt.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider></Divider>
          <CardActions className="align-right pad-10">
            <div className="flex-1">&nbsp;</div>
            <Button
              color="primary"
              variant="contained"
              onClick={() => policyMutation()}
            >
              Save
            </Button>
          </CardActions>
        </Card>

        {/* <div onClick={() => policyMutation()}>Click to Create new Policy</div> */}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}

export default withAuthenticator(AddPolicy, {
  includeGreetings: false
});
