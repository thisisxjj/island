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
    showPlayIcon: true
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
        bam.src = app.playingSongUrl
        bam.title = this.properties.song.name
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
    },
    playPrev() {
      if(!this.properties.playlist) {
        return
      }
      let trackArray = this.properties.playlist.tracks
      for(let i = trackArray.length - 1; i >= 0; i--) {
        if(this.properties.song.id === trackArray[i].id) {
          if(i >= 1) {
            //播放上一首歌曲
            songDetailModel.getSongPlayUrl(trackArray[i - 1].id)
              .then(res => {
                if(!res.data[0].url) {
                  wx.showModal({
                    content: '该歌曲请前往云音乐APP播放',
                    confirmText: '我知道了',
                    showCancel: false
                  })
                  this.setData({
                    showPlayIcon: false
                  })
                  app.playingSongId = 0
                  return
                }
                bam.src = res.data[0].url
                bam.title = trackArray[i - 1].name
                bam.singer = this.splice(trackArray[i - 1].ar) + ' - ' + trackArray[i - 1].al.name
                bam.coverImgUrl = trackArray[i - 1].al.picUrl
                // 更新歌曲对象数据
                this.setData({
                  song: trackArray[i - 1],
                  playing: true
                })
                app.playingSongId = trackArray[i - 1].id
              })
          }
        }
      }
    },
    playNext() {
      if(!this.properties.playlist) {
        return
      }
      let trackArray = this.properties.playlist.tracks
      for(let i = 0; i < trackArray.length; i++) {
        if(this.properties.song.id === trackArray[i].id) {
          if(i < trackArray.length - 1) {
            //播放下一首歌曲
            songDetailModel.getSongPlayUrl(trackArray[i+1].id)
              .then(res => {
                if(!res.data[0].url) {
                  wx.showModal({
                    content: '该歌曲请前往云音乐APP播放',
                    confirmText: '我知道了',
                    showCancel: false
                  })
                  this.setData({
                    showPlayIcon: false
                  })
                  app.playingSongId = 0
                  return
                }
                bam.src = res.data[0].url
                bam.title = trackArray[i + 1].name
                bam.singer = this.splice(trackArray[i + 1].ar) + ' - ' + trackArray[i + 1].al.name 
                bam.coverImgUrl = trackArray[i + 1].al.picUrl
                // 更新歌曲对象数据
                this.setData({
                  song: trackArray[i + 1],
                  playing: true
                })
                app.playingSongId = trackArray[i + 1].id
              })
          }
        }
      }
    },
    splice(arr) {
      if(!arr) {
        return
      }
      var temp = ''
      for(var i = 0; i < arr.length; i++) {
        temp += (i < arr.length - 1) ? (arr[i].name + '/') : arr[i].name 
      }
      return temp
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
        songDetailModel.getSongPlayUrl(song.id)
          .then(res => {
            // console.log(res)
            if(!res.data[0].url) {
              wx.showModal({
                content: '该歌曲请前往云音乐APP播放',
                confirmText: '我知道了',
                showCancel: false
              })
              this.setData({
                showPlayIcon: false
              })
              app.playingSongId = 0
              return
            }
            bam.title = this.properties.song.name
            bam.src = res.data[0].url
            bam.singer = this.splice(song.ar) + ' - ' + song.al.name 
            bam.coverImgUrl = song.al.picUrl
            this.setData({
              src: res.data[0].url,
              playing: true
            })
            //设置全局的播放歌曲的songid
            app.playingSongId = this.properties.song.id
          })
      }
    }
  }
})
