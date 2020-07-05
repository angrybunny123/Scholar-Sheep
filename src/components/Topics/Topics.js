import React from "react";

import animalsLogo from "../../assets/topics/animals.jpg";
import mathLogo from "../../assets/topics/math.jpg";
import moviesLogo from "../../assets/topics/movies.jpg";
import sportsLogo from "../../assets/topics/sports.jpg";

import foodLogo from "../../assets/topics/food.jpg";
import sghistoryLogo from "../../assets/topics/sghistory.jpg";
import technologyLogo from "../../assets/topics/technology.jpg";
import scienceLogo from "../../assets/topics/science.jpg";

import celebritiesLogo from "../../assets/topics/celebrities.jpg";
import funfactsLogo from "../../assets/topics/funfacts.jpg";

import generalknowledgeLogo from "../../assets/topics/generalknowledge.jpg";
import musicLogo from "../../assets/topics/music.jpg";
import TopicCard from "./TopicCard/TopicCard";

const topics = (props) => {
  let card = null;
  const topic = props.topic;
  if (topic === "Animals") {
    card = <TopicCard topicimage={animalsLogo} topicname="Animals" />;
  } else if (topic === "Math") {
    card = <TopicCard topicimage={mathLogo} topicname="Math" />;
  } else if (topic === "Movies") {
    card = <TopicCard topicimage={moviesLogo} topicname="Movies" />;
  } else if (topic === "Sports") {
    card = <TopicCard topicimage={sportsLogo} topicname="Sports" />;
  } else if (topic === "Food") {
    card = <TopicCard topicimage={foodLogo} topicname="Food" />;
  } else if (topic === "Singapore History") {
    card = (
      <TopicCard topicimage={sghistoryLogo} topicname="Singapore History" />
    );
  } else if (topic === "Technology") {
    card = <TopicCard topicimage={technologyLogo} topicname="Technology" />;
  } else if (topic === "Science") {
    card = <TopicCard topicimage={scienceLogo} topicname="Science" />;
  } else if (topic === "Celebrities") {
    card = <TopicCard topicimage={celebritiesLogo} topicname="Celebrities" />;
  } else if (topic === "Fun Facts") {
    card = <TopicCard topicimage={funfactsLogo} topicname="Fun Facts" />;
  } else if (topic === "General Knowledge") {
    card = (
      <TopicCard
        topicimage={generalknowledgeLogo}
        topicname="General Knowledge"
      />
    );
  } else if (topic === "Music") {
    card = <TopicCard topicimage={musicLogo} topicname="Music" />;
  }
  return <div>{card}</div>;
};

export default topics;
