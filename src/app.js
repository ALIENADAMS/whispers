const express = require('express');
const path = require('path');
const fs = require('fs');

const indexRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRoutes);

module.exports = app;