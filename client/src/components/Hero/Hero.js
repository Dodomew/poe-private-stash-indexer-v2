import React from 'react';

const Hero = (props) => {
    return (
        <div className="hero">
            <h1>
                {props.league}
            </h1>
            <p>
                {props.loadingMessage}
            </p>
        </div>
    );
};

export default Hero;
