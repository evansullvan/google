'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ' + playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
    };
    logger.info('about to render', viewData.playlist);
    response.render('playlist', viewData);
  },
    deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
    addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
  updateSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug("updating song " + songId);
    const updatedSong = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    playlistStore.editSong(playlistId, songId, updatedSong);
    response.redirect('/playlist/' + playlistId);
  }
};

module.exports = playlist;