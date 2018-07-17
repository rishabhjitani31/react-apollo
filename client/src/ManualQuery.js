import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { Button, Input, InputNumber } from "antd";
import "antd/dist/antd.css";
import { gql } from "apollo-boost";

const GET_MANUAL_QUERY = gql`
  query rishabh {
    users {
      tutorial_id
      tutorial_title
    }
  }
`;

const ADD_MANUAL_QUERY = gql`
  mutation add($id: Int!, $text: String!) {
    addValues(tutorial_id: $id, tutorial_title: $text) {
      tutorial_id
      tutorial_title
    }
  }
`;

const DELETE_MANUAL_QUERY = gql`
  mutation delete($id: Int!) {
    deleteValues(tutorial_id: $id) {
      tutorial_id
      tutorial_title
    }
  }
`;

class ManualQuery extends Component {
  state = { manualQuery: [], id: 0, text: "" };
  onManualClick = data => {
    this.setState({ manualQuery: data.users });
  };

  onNumberChange = e => {
    this.setState({ id: e });
  };

  onTextChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div style={{ margin: "15px" }}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <Button
                type="primary"
                style={{ marginRight: "20px" }}
                onClick={async () => {
                  const { data } = await client.query({
                    query: GET_MANUAL_QUERY
                  });
                  this.onManualClick(data);
                }}
              >
                Click to find all records
              </Button>
              <InputNumber
                style={{ marginRight: "20px", width: "10%" }}
                placeholder="Enter the id to add"
                onChange={this.onNumberChange}
              />
              <Input
                style={{ marginRight: "20px", width: "10%" }}
                type="text"
                placeholder="Enter the skill to add"
                onChange={this.onTextChange}
              />
              <Button
                style={{ marginRight: "20px" }}
                type="primary"
                onClick={async () => {
                  await client.mutate({
                    mutation: ADD_MANUAL_QUERY,
                    variables: { id: this.state.id, text: this.state.text },
                    refetchQueries: () => [
                      {
                        query: GET_MANUAL_QUERY
                      }
                    ]
                  });
                  const { data } = await client.query({
                    query: GET_MANUAL_QUERY
                  });
                  this.onManualClick(data);
                }}
              >
                Click to Add records
              </Button>
            </div>
            <div style={{ margin: "15px" }}>
              {this.state.manualQuery &&
                this.state.manualQuery.map(
                  ({ tutorial_id, tutorial_title }) => (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "244px",
                        marginTop: "20px"
                      }}
                      key={tutorial_id}
                    >
                      <div style={{ display: "flex", width: "200px" }}>
                        <p>{`id: ${tutorial_id}`}</p>
                        &nbsp;<p>{`name: ${tutorial_title}`}</p>
                      </div>
                      <Button
                        icon="delete"
                        style={{
                          fontSize: 16,
                          color: "rgb(139,0,0)",
                          marginRight: "15px"
                        }}
                        onClick={async () => {
                          console.log(tutorial_id);
                          await client.mutate({
                            mutation: DELETE_MANUAL_QUERY,
                            variables: { id: tutorial_id },
                            refetchQueries: () => [
                              {
                                query: GET_MANUAL_QUERY
                              }
                            ]
                          });
                          const { data } = await client.query({
                            query: GET_MANUAL_QUERY
                          });
                          this.onManualClick(data);
                        }}
                      />
                      <Button
                        icon="edit"
                        style={{ fontSize: 16, color: "#08c" }}
                      />
                    </div>
                  )
                )}
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default ManualQuery;
