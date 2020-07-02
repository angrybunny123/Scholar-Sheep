import React, { Component } from "react";

class Unauthenticated extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", fontSize: "2.2rem", margin: "3rem" }}>
        Please log in to access this page.
      </div>
    );
  }
}

export default Unauthenticated;
