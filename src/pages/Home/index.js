import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";

const listPolicys = `query listPolicys {
  listPolicys{
    items{
      id
      title
      country
      state
      effectiveFrom
    }
  }
}`;

function Home() {
  useEffect(() => {
    API.graphql(graphqlOperation(listPolicys)).then(resp =>
      alert(JSON.stringify(resp))
    );
  }, []);

  return (
    <div>
      <div>
        <Link to="/addpolicy">Add Policy</Link>
      </div>
    </div>
  );
}

export default Home;
