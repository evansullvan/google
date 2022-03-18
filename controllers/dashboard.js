'use strict';

// import all required modules
const logger = require('../utils/logger');
const uuid = require('uuid');

const playlistStore = require('../models/playlist-store.js');

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('dashboard rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Playlist App Dashboard',
      playlists: playlistStore.getAllPlaylists(),
    };
    
    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.playlists);
    response.render('dashboard', viewData);
  },
  
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  
  addPlaylist(request, response) {
    const newPlayList = {
      id: uuid(),
      title: request.body.title,
      duration: request.body.duration,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },
};

// export the dashboard module
module.exports = dashboard;