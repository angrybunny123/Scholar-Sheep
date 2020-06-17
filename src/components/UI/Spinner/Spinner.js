import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => (
  <div className={classes.loader}>
    <p style={{ textAlign: "center", fontSize: "1.2rem" }}>{props.message}</p>
  </div>
);

export default spinner;
