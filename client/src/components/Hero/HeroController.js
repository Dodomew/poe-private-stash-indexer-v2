import React, { useState } from 'react';
import Hero from "./Hero";

const HeroController = (props) => {
    return (
        <Hero 
            league={props.league}
            loadingMessage={props.loadingMessage}
        />
    )
};

export default HeroController;
