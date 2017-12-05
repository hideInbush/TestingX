require('../css/index.css');

import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from '../jsx/components/sideBar';
import ReviseForm from '../jsx/components/reviseForm';
import TabCard from '../jsx/components/tabCard';

var eventProxy = require('eventproxy')();
ReactDOM.render(
    <div>
        <SideBar />
        <TabCard />
    </div>,
    document.getElementById('container')
);