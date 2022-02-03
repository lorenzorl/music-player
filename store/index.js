import songs from '../data/songs'

export const state = () => ({
  audio: null,
  currentSong: null,
  songs: songs
})

export const mutations = {
  initAudio(state){
    state.audio = new Audio();
  },
  setAudioSrc(state, payload){
    state.audio.src = payload;
  },
  pausePlayer(state){
    state.audio.pause();
  },
  playPlayer(state){
    state.audio.play();
  },
  pauseSong(state, index){
    state.songs[index].paused = true;
  },
  setCurrentSong(state, index){
    state.currentSong = index;
  },
  playSong(state, index){
    state.songs[index].paused = false;
  },
  setCurrentTime(state, time){
    state.audio.currentTime = time;
  },
  setLike(state, index){
    const songId = state.songs[index].id + '_liked';
    localStorage.setItem(songId, true);
    state.songs[index].liked = true;
  },
  removeLike(state, index){
    const songId = state.songs[index].id + '_liked';
    localStorage.removeItem(songId);
    state.songs[index].liked = false;
  }
}

export const actions = {
  initAudio({ commit, state }){
    if(!state.audio){
      commit('initAudio');
    }
  },
  setCurrentSong({ commit }, index){
    commit('setCurrentSong', index);
  },
  changeSong({ commit, state, dispatch }, index){
    commit('pauseSong', state.currentSong);
    const src = state.songs[index].src;
    commit('setAudioSrc', src);
    commit('setCurrentSong', index);
    dispatch('playPlayer');
  },
  pausePlayer({ commit, state }){
    commit('pausePlayer');
    commit('pauseSong', state.currentSong);
  },
  playPlayer({ commit, state }){
    commit('playPlayer');
    commit('playSong', state.currentSong);
  },
  setCurrentTime({ commit }, time){
    commit('setCurrentTime', time);
  },
  stopPlayer({ commit, state }){
    commit('pausePlayer');
    commit('pauseSong', state.currentSong);
    commit('setCurrentTime', 0);
  },
  nextSong({ state, commit }){
    const nextIndex = state.currentSong + 1;
    if(nextIndex >= state.songs.length) return;

    commit('pauseSong', state.currentSong);
    const src = state.songs[nextIndex].src;
    commit('setAudioSrc', src);
    commit('setCurrentSong', nextIndex);
    commit('playPlayer');
    commit('playSong', state.currentSong);
  },
  prevSong({ state, commit }){
    const prevIndex = state.currentSong - 1;
    if(prevIndex < 0) return;

    commit('pauseSong', state.currentSong);
    const src = state.songs[prevIndex].src;
    commit('setAudioSrc', src);
    commit('setCurrentSong', prevIndex);
    commit('playPlayer');
    commit('playSong', state.currentSong);
  },
  like({ commit, state }){
    let currentSong = state.currentSong;
    if(!state.currentSong){
      currentSong = 0;
    }
    const liked = state.songs[currentSong].liked;
    if (liked) {
      commit('removeLike', currentSong);
    } else {
      commit('setLike', currentSong);
    }
  }
}
export const getters = {
  currentThumbnail(state){
    if(state.currentSong === null) return state.songs[0].thumb + '.jpg'
    return state.songs[state.currentSong].thumb + '.jpg';
  },
  liked(state){
    if(state.currentSong === null) return state.songs[0].liked;
    return state.songs[state.currentSong].liked;
  }
}