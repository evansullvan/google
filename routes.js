'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/playlist/:id', playlist.index);

router.get('/playlist/:id/deleteSong/:songid', playlist.deleteSong);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);

router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);

// export router module
module.exports = router;

