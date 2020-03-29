import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      console.log("user", user);
      setIsAuthenticated(true);
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton> */}
          <Route
            render={({ history }) => (
              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => {
                  history.push("/");
                }}
              >
                Covid Measures
              </Typography>
            )}
          />

          {isAuthenticated && (
            <Button
              color="inherit"
              onClick={() => {
                Auth.signOut()
                  .then(data => setIsAuthenticated(false))
                  .catch(err => console.log(err));
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
