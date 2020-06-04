import React, { useState } from 'react';
import Hero from "./Hero";

const HeroController = (props) => {
    return (
        <Hero 
            league={props.league}
            loadingMessage={props.loadingMessage}
            hasLeagueBeenFetched={props.hasLeagueBeenFetched}
        />
    )
};

export default HeroController;
