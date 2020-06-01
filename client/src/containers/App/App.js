import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import AppController from "../AppController/AppController";

const App = () => {
    return (
        <div className="app">
            <AppController />
        </div>
    )
};

export default App;
