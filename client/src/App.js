import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_ORGANIZATION = gql`
  query rishabh($id: Int!) {
    users(tutorial_id: $id) {
      tutorial_id
      tutorial_title
    }
  }
`;

class App extends Component {
  render() {
    console.log(this.props.id);
    return (
      <Query
        query={GET_ORGANIZATION}
        variables={{ id: this.props.id }}
        skip={!this.props.id}
        pollInterval={500}
      >
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
