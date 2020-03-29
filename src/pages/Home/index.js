import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import "./Home.scss";
import {
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { countries } from "../../refData";
import PolicyItem from "../../components/PolicyItem";

const listPolicys = `query listPolicys($country:ModelStringInput $state:ModelStringInput){
  listPolicys(filter:{country:$country, state:$state}){
    items{
      id
      title
      country
      state
      tweetId
      effectiveFrom
    }
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

function Home() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [country, setCountry] = useState(
    window.localStorage.getItem("country")
      ? window.localStorage.getItem("country")
      : ""
  );
  const [state, setState] = useState(
    window.localStorage.getItem("state")
      ? window.localStorage.getItem("state")
      : ""
  );

  const [policies, setPolicies] = useState([]);
  const [datewisePolicies, setDatewisePolicies] = useState({});

  useEffect(() => {
    window.localStorage.setItem("country", country);
    window.localStorage.setItem("state", state);
    API.graphql(
      graphqlOperation(listPolicys, {
        country: { eq: country },
        state: { eq: state }
      })
    ).then(resp => {
      let datewisePolicies = resp.data.listPolicys.items.reduce((acc, item) => {
        const effDateUnderscore = item.effectiveFrom.replace(/ /g, "_");
        if (!acc[effDateUnderscore]) acc[effDateUnderscore] = [];
        acc[effDateUnderscore].push(item);
        return acc;
      }, {});
      setDatewisePolicies(datewisePolicies);
      setPolicies(resp.data.listPolicys.items);
      setLoading(false);
    });
  }, [country, state]);

  useEffect(() => {
    if (country && state) {
      API.graphql(
        graphqlOperation(listPolicys, {
          country: { eq: country },
          state: { eq: state }
        })
      ).then(resp => {
        let datewisePolicies = resp.data.listPolicys.items.reduce(
          (acc, item) => {
            const effDateUnderscore = item.effectiveFrom.replace(/ /g, "_");
            if (!acc[effDateUnderscore]) acc[effDateUnderscore] = [];
            acc[effDateUnderscore].push(item);
            return acc;
          },
          {}
        );
        setDatewisePolicies(datewisePolicies);
        setPolicies(resp.data.listPolicys.items);
        setLoading(false);
      });
    }
  }, []);

  return (
    <Container>
      <div className="home-container">
        <Paper>
          <div className="toolbar">
            <div>
              <FormControl className={classes.formControl}>
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
              {country && (
                <FormControl className={classes.formControl}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={state}
                    onChange={evt => setState(evt.target.value)}
                  >
                    {countries
                      .find(cnt => cnt.country === country)
                      .states.map(s => (
                        <MenuItem value={s}>{s}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </div>
          </div>
        </Paper>
        <br />
        <div className="align-right">
          <Route
            render={({ history }) => (
              <Button
                onClick={() => {
                  history.push("/addpolicy");
                }}
                color="primary"
                variant="contained"
              >
                Add New Policy
              </Button>
            )}
          />
        </div>
        {loading ? null : Object.keys(datewisePolicies).length > 0 ? (
          Object.keys(datewisePolicies).map(polDate => (
            <div>
              <h4>{polDate.replace(/_/g, " ")}</h4>
              {datewisePolicies[polDate].map(policy => (
                <PolicyItem policy={policy}></PolicyItem>
              ))}
            </div>
          ))
        ) : (
          // policies.map(policy => <PolicyItem policy={policy}></PolicyItem>)
          <Paper className="empty">
            <div>No Policies added yet.</div>
          </Paper>
        )}
        {/* <div>
        <Link to="/addpolicy">Add Policy</Link>
        <span>Hello World!!!</span>
      </div> */}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}

export default Home;
