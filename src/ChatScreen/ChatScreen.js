import React, { Component } from 'react';
// import { Card, ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageArray: '',
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    addChat() {
        this.setState({ value: '' })
        fetch('https://chatappbackend22.herokuapp.com/addChat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "senderId": this.props.location.state.uid,
                "receiverId": this.props.location.state.item.id,
                "message": this.state.value
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log("ressss", res)
                if(res.status===308){
                    alert("WARNING!!!!you are using abusive words")
                }
                //   history.push('/AllUserScreen',{ uid: res.uid })

            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    componentDidMount() {
        console.log("yourid", this.props.location.state.uid)
        console.log("otherid", this.props.location.state.item)


        this.intervalId = setInterval(this.timer.bind(this), 1000);

        fetch('https://chatappbackend22.herokuapp.com/getAllChat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "yourUserId": this.props.location.state.uid,
                "otherUserId": this.props.location.state.item.id
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log("ressss", res)
                //   history.push('/AllUserScreen',{ uid: res.uid })

            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }


    timer() {
        fetch('https://chatappbackend22.herokuapp.com/getAllChat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "yourUserId": this.props.location.state.uid,
                "otherUserId": this.props.location.state.item.id
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log("ressss", res)
                this.setState({ messageArray: res })
                //   history.push('/AllUserScreen',{ uid: res.uid })

            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div
                style={{ justifyContent: 'center', padding: 30, flex: 1 }}
            >
                {this.state.messageArray && <div>
                    {this.state.messageArray.map((item) =>
                        <p
                            style={{ textAlign: item.senderId === this.props.location.state.uid ? 'right' : 'left' }}
                            key={item.id}
                        >
                            {item.senderId !== this.props.location.state.uid && this.props.location.state.item.username + ' => '}  {item.message}{item.senderId === this.props.location.state.uid && ' <=.YOU.'}
                        </p>
                    )}
                </div>}
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <Button variant="btn btn-success" onClick={() => this.addChat()}>Send</Button>
            </div>
        );
    }
}

export default ChatScreen;