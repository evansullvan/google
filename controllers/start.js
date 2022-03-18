'use strict';

// import all required modules
const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // app statistics calculations

    const playlists = playlistStore.getAllPlaylists();

    let numPlaylists = playlists.length;

    let numSongs = 0;

    for (let item of playlists) {
        numSongs += item.songs.length;
    }
    
    // display confirmation message in log
    logger.info('start rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
        title: 'Welcome to the Playlist App!',
        totalPlaylists: numPlaylists,
        totalSongs: numSongs,
    };
    
    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

// export the start module
module.exports = start;