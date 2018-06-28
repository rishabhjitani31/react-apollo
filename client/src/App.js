import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_ORGANIZATION = gql`
  {
    users(tutorial_id: 2) {
      tutorial_id
      tutorial_title
    }
  }
`;

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Query query={GET_ORGANIZATION}>
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.users.map(({ tutorial_id, tutorial_title }) => (
            <div style={{ display: "flex" }} key={tutorial_id}>
              <p>{`id: ${tutorial_id}`}</p>
              &nbsp;<p>{`name: ${tutorial_title}`}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default App;
