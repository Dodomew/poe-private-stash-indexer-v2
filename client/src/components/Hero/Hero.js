import React from 'react';
import './hero.scss'

const Hero = (props) => {
    return (
        <div className="hero">
            <h1 className="hero__title">
                {props.league}
            </h1>
            <p className="hero__message">
                {props.loadingMessage}
            </p>
        </div>
    );
};

export default Hero;
