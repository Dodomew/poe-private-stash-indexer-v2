import React, { useState, useEffect } from 'react';
import LeagueDisplay from "./LeagueDisplay";

const LeagueDisplayContainer = (props) => {
    useEffect(() => {
        getLeague()
            .then((data) => {
                setLeague(data.body.result[0].id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const getLeague = async() => {
        const response = await fetch('/api/get-league');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    return (
        <LeagueDisplay league={data}/>
    );
};

export default LeagueDisplayContainer;
