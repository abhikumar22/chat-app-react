import React, { Component } from 'react';
// import { Card, ListGroup } from 'react-bootstrap';
import history from './../history';
// import { Button } from 'react-bootstrap';


class AllUsersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUsers: ''
        };
    }
    componentDidMount() {
        this.loginFun()
    }

    loginFun = () => {
        fetch('https://chatappbackend22.herokuapp.com/getAllUsers')
            .then(data => data.json())
            .then((data) => {
                this.setState({ arrayUsers: data })
                // console.log("hello", data)
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>User Screen</h2>
                    {/* <Card style={{ width: '18rem' }}>
                        <ListGroup>
                            <ListGroup.Item
                                onClick={() => { this.changeColor(1) }}
                            >USER 1</ListGroup.Item>
                            <ListGroup.Item
                                onClick={() => { this.changeColor(2) }}
                            >USER 2</ListGroup.Item>
                            <ListGroup.Item
                                onClick={() => { this.changeColor(3) }}
                            >USER 3</ListGroup.Item>
                        </ListGroup>
                    </Card> */}
                </div>
                {/* <Button variant="btn btn-success" onClick={() => this.loginFun()}>Click to login</Button> */}
                {this.state.arrayUsers &&
                    <ul>
                        {this.state.arrayUsers.map((item) =>
                            <li
                                key={item.id}
                                onClick={() => {
                                    // alert(item.username)
                                    history.push('/ChatScreen', {
                                        item: item,
                                        uid: this.props.location.state.uid
                                    })

                                }}
                            >
                                {item.username}
                                {/* key={item.id} value={item.username} */}
                            </li>
                        )}
                    </ul>}
            </div>
        );
    }
}

export default AllUsersScreen;