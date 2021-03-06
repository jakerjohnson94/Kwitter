import React from "react";
import { Component } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  TextArea
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const USER_API_URL = "https://stark-brook-53416.herokuapp.com/users";

class AboutMe extends Component {
  state = {
    editing: false,
    textInput: "",
    aboutMeResponse: this.props.loggedInUserAbout
  };

  

  handleEditButton = () => this.setState({ editing: true });
  handleSubmitButton = event => {
    const body = {
      about: this.state.textInput
    };
    event.preventDefault();
    fetch(USER_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.props.loggedInUserAuthKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({editing: false, aboutMeResponse: data.user.about})
      });
    };

  handleTextInput = event => this.setState({ textInput: event.target.value });

  render() {
    // console.log(this.props.loggedInUserAbout)
    return (
      <Container text>
        <Segment centered='true' style={{ width: "42rem" }}>
          <Header as="h2">About Me</Header>
          <React.Fragment>
            {!this.state.editing ? (
              <p style={{ fontSize: "16px", color: "black" }}>
              {this.state.aboutMeResponse !== '' ? this.state.aboutMeResponse : <p style={{color: 'gray'}}>This is where your bio will appear!</p>}
              
              </p>
            ) : (
              <TextArea
                autoHeight
                onChange={this.handleTextInput}
                style={{ width: "40rem", borderRadius: "5px" }}
              />
            )}
          </React.Fragment>
        </Segment>
        {!this.state.editing ? (
          <Button
            size="mini"
            onClick={this.handleEditButton}
            style={{ backgroundColor: "#E8F8F5", color: "gray" }}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="mini"
            onClick={this.handleSubmitButton}
            style={{ backgroundColor: "#E8F8F5", color: "gray" }}
          >
            Submit
          </Button>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUserAuthKey: state.loginUser.loggedInUser.token,
    loggedInUserUserId: state.loginUser.loggedInUser.id,
    loggedInUserAbout: state.loginUser.loggedInUser.about
  };
};

export default withRouter(connect(mapStateToProps)(AboutMe));
