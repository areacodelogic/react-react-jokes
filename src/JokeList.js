import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    // let jokes = [];

    // while (jokes.length < 10) {
    //   let response = await axios.get("https://icanhazdadjoke.com/", {
    //     headers: { Accept: "application/json" }
    //   });

    //   jokes.push({ text: response.data.joke, id: uuid(), votes: 0 });
    // }
    let respArray = Array.from({length: 10}, () => axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    }));

    let finalArray = await Promise.all(respArray)
    
    this.setState({ jokes: finalArray.map(joke => (
        {text: joke.data.joke, id: uuid(), votes: 0}
    ))});
  }

  handleVote(id, count) {
    this.setState(st => ({
      jokes: st.jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + count } : joke
      )
    }));
  }

  render() {
    const Jokes = this.state.jokes.map(j => (
      <Joke
        key={j.id}
        id={j.id}
        text={j.text}
        votes={j.votes}
        handleVote={this.handleVote}
      />
    ));
    return (
      <div>
        <h1>Jokes</h1>
        {Jokes}
      </div>
    );
  }
}

export default JokeList;
