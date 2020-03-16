import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  loginFun(event) {
    // console.log("hello")
    fetch('https://chatappbackend22.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        username: this.state.value,
      })
    })
    .then(response => response.json())
    .then(res => {
      // console.log(json)
      history.push('/AllUserScreen',{ uid: res.uid })

    })
    .catch(error => console.log('Authorization failed : ' + error.message));
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <p>A simple app showing react button click navigation</p>
          <form>
            {/* <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button> */}
            {/* <Button variant="btn btn-success" onClick={() => history.push('/AllUserScreen')}>Click to login</Button> */}
          </form>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}
            <Button variant="btn btn-success" onClick={() => this.loginFun()}>Click to login</Button>
          </form>

        </div>
      </div>
    );
  }
}
