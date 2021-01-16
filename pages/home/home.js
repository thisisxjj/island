// pages/home/home.js
import ToplistDetailModel from '../../models/toplistDetail'
const toplistDetailModel = new ToplistDetailModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songToplist: [],
    artistToplist: null,
    rewardToplist: null,
    title: '云音乐',
    bgColor: 'rgba(255,255,255,0)'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    toplistDetailModel.getToplistDetail()
      .then(res => {
        console.log(res)
        this.setData({
          songToplist: res.list,
          artistToplist: res.artistToplist,
          rewardToplist: res.rewardToplist
        })
      })
  },
  //导航到歌单页面
  onNavigate(event) {
    console.log('home:', event)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})