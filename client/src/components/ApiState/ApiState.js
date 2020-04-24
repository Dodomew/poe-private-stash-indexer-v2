import React, { useState, useEffect } from 'react';
import LeagueDisplayContainer from "./LeagueDisplay/LeagueDisplayContainer";

const ApiState = (props) => {
    const [league, setLeague] = useState(null);

    return (
        <LeagueDisplayContainer/>
    );
};

export default ApiState;
