// pages/songlist/songlist.js
import deviceUtil from "../../components/utils/device-util"
import SonglistModel from "../../models/songlist"
const songlistModel = new SonglistModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '歌单',
    capsuleBarHeight: deviceUtil.getNavigationBarHeight() + 20,
    bgColor: 'transparent',
    playlist: null,
    bC: 'red',
    loading: false,
    onceNum: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._showLoading()
    songlistModel.getSonglistById(options.tid)
      .then(res => {
        this.setData({
          playlist: res.playlist
        })
        this._hideLoading()
      }, err => {
        this._hideLoading()
      })
  },
  _showLoading() {
    this.setData({
      loading: true
    })
  },
  _hideLoading() {
    this.setData({
      loading: false
    })
  },
  onPlayAll(event) {
    this.onPlay(event, this.data.playlist.tracks[0])
  },
  onPlay(event, playAllSong) {
    // console.log('play:', event)
    const song = event.detail.song || playAllSong
    if(!song) {
      return
    }
    wx.navigateTo({
      url: '/pages/play/play',
      success: (res) => {
        res.eventChannel.emit('transferData', { 
          song: song,
          playlist: this.data.playlist
        })
      }
    })
  },
  onShowSummary() {
    wx.navigateTo({
      url: '/pages/summary/summary',
      success: (res) => {
        res.eventChannel.emit('transferData', { 
          playlist: this.data.playlist,
          title: this.data.title,
          bgColor: this.data.bgColor
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let onceNum = this.data.onceNum + 15
    let length = this.data.playlist.tracks.length
    onceNum = onceNum > length ? length : onceNum
    this.setData({
      onceNum
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})