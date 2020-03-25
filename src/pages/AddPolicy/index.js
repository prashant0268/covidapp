import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";
import { withAuthenticator } from "aws-amplify-react";

const addPolicy = `mutation createPolicy($title:String $country: String $state: String! $effectiveFrom: String) {
  createPolicy(input:{
    title:$title
    country:$country
    state:$state
    effectiveFrom:$effectiveFrom
  }){
    id
    title
    country
    state
    effectiveFrom
  }
}`;

function AddPolicy() {
  const policyMutation = async () => {
    const policyDetails = {
      title: "Party tonight!",
      country: "India",
      state: "Delhi",
      effectiveFrom: "13th Mar 2020"
    };
    const newPolicy = await API.graphql(
      graphqlOperation(addPolicy, policyDetails)
    );
    alert(JSON.stringify(newPolicy));
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <div onClick={() => policyMutation()}>Click to Create new Policy</div>
    </div>
  );
}

export default withAuthenticator(AddPolicy, true);
