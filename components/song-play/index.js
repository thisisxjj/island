import deviceUtil from "../../components/utils/device-util"
import SongDetailModel from "../../models/songdetail"
const songDetailModel = new SongDetailModel()
const bam = wx.getBackgroundAudioManager()
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song: Object,
    playlist: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    capsuleBarHeight:  deviceUtil.getNavigationBarHeight() + 20,
    bgColor: 'rgba(0,0,0,0)',
    playing: false,
    playSrc: './icons/playing-play.png',
    pauseSrc: './icons/playing-pause.png',
    showPlayIcon: true,
    prevSong: null,
    nextSong: null,
    checkedSongs: []
  },
  attached() {
    this.setData({
      playing: true
    })
    // app.playingSongUrl && ()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        bam.play()
      } else {
        this.setData({
          playing: false
        })
        bam.pause()
      }
    },
    _recoverStatus() {
      if (bam.paused) {
        this.setData({
          playing: false
        })
        return
      }
      this.setData({
        playing: true
      })
    },
    showDontPlayModal() {
      wx.showModal({
        content: '该歌曲请前往云音乐APP播放',
        confirmText: '我知道了',
        showCancel: false
      })
      this.setData({
        showPlayIcon: false
      })
      app.playingSongId = 0
    },
    checkAndRequestSong(song) {
      this.checkSong(song).then(res => {
        if(res.success) {
            return songDetailModel.getSongPlayUrl(song.id)
        } else {
          bam.stop()
          return this.showDontPlayModal()
        }
      }).then(res => {
        if(!res) {
          return
        }
        this.setBackgroundAudioManager(song, res)
      })
    },
    setBackgroundAudioManager(song, res) {
      bam.title = song.name
      bam.src = res.data[0].url
      bam.singer = this._splice(song.ar) + ' - ' + song.al.name 
      bam.coverImgUrl = song.al.picUrl
      //设置全局的播放歌曲的songid
      app.playingSongId = song.id
      this.setData({
        song,
        playing: true
      })
    },
    checkSong(song) {
      return songDetailModel.checkSongUrl(song.id)
    },
    getSongIndexFromList(song, playlist) {
      if(!playlist) {
        return -1
      }
      let trackArray = playlist.tracks
      for(let i = 0; i < trackArray.length; i++) {
        if(song.id === trackArray[i].id) {
          return i;
        }
      }
      return -1
    },
    getPrevSong(index, playlist) {
      let preIndex = index - 1 < 0 ? (playlist.tracks.length - 1) : (index - 1)
      return playlist.tracks[preIndex]
    },
    getNextSong(index, playlist) {
      let nextIndex = index + 1 >= playlist.tracks.length ? 0 : (index + 1)
      return playlist.tracks[nextIndex]
    },
    setPlayPrev(song, playlist) {
      let index = this.getSongIndexFromList(song, playlist)
      let tempPrevSong = this.getPrevSong(index, playlist)
      this.checkSong(tempPrevSong)
        .then(res => {
          if(res.success) {
            this.setData({
              prevSong: tempPrevSong
            })
            return
          } else {
            this.setPlayPrev(tempPrevSong, playlist)
          }
        })
    },
    setPlayNext(song, playlist) {
      let index = this.getSongIndexFromList(song, playlist)
      let tempNextSong = this.getNextSong(index, playlist)
      this.checkSong(tempNextSong)
        .then(res => {
          if(res.success) {
            this.setData({
              nextSong: tempNextSong
            })
            return
          } else {
            this.setPlayNext(tempNextSong, playlist)
          }
        })
    },
    playNext() {
      this.setData({
        song: this.data.nextSong
      })
    },
    playPrev() {
      this.setData({
        song: this.data.prevSong
      })
    },
    _splice(arr) {
      if(!arr) {
        return
      }
      var temp = ''
      for(var i = 0; i < arr.length; i++) {
        temp += (i < arr.length - 1) ? (arr[i].name + '/') : arr[i].name 
      }
      return temp
    },
    _monitorSwitch() {
      bam.onPlay(() => {
        this._recoverStatus()
      })
      bam.onStop(() => {
        this._recoverStatus()
      })
      bam.onEnded(() => {
        this._recoverStatus()
        this.playNext()
      })
      bam.onPause(() => {
        this._recoverStatus()
      })
      bam.onNext(() => {
        this.playNext()
      })
      bam.onPrev(() => {
        this.playPrev()
      })
    }
  },
  observers: {
    'song': function(song) {
      //1811921555
      if(song) {
        if(song.id === app.playingSongId) {
          bam.paused && bam.play()
          return
        }
        this.checkAndRequestSong(song)
        this.setPlayNext(song, this.properties.playlist)
        this.setPlayPrev(song, this.properties.playlist)
      }
    }
  }
})
