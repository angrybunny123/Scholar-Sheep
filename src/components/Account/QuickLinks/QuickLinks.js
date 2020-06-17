import React from 'react';

import classes from './QuickLinks.module.css';

const quickLinks = (props) => {
    return (
        <div className={classes.QuickLink}>
            <h className={classes.LinkName}>{props.LinkName}</h>
            <button>Lets Go</button>
        </div>
    );
};

export default quickLinks