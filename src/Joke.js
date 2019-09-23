import React, { Component } from "react";

class Joke extends Component {
  constructor(props){
    super(props);
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

  upVote(){
    this.props.handleVote(this.props.id, 1)
  } 

  downVote(){
    this.props.handleVote(this.props.id, -1)
  }

  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <i className="far fa-thumbs-up" onClick={this.upVote}></i>
        <p>{this.props.votes} </p>
        <i className="far fa-thumbs-down" onClick={this.downVote}></i>
      </div>
    );
  }
}

export default Joke;
