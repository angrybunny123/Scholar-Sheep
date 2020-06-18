import React from "react";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div>
      <p>
        <strong>Categories:</strong>
      </p>
      <div className={classes.SideBar}>
        <p>
          <button>Animals</button>
        </p>
        <p>
          <button>Science</button>
        </p>
        <p>
          <button>Cooking</button>
        </p>
        <p>
          <button>Math</button>
        </p>
        <p>
          <button>Sports</button>
        </p>
        <p>
          <button>Superheroes</button>
        </p>
        <p>
          <button>Astronomy</button>
        </p>
        <p>
          <button>Emotions</button>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
