// pages/home/home.js
import SonglistModel from '../../models/songlist'
import SongDetailModel from '../../models/songdetail'
const songlistModel = new SonglistModel();
const songDetailModel = new SongDetailModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songlist: [
      {
        index: 0,
        name: '飙升榜',
        playlist: null,
        privileges: null,
        topThree: []
      },
      {
        index: 1,
        name: '新歌榜',
        playlist: null,
        privileges: null,
        topThree: []
      },
      {
        index: 2,
        name: '热歌榜',
        playlist: null,
        privileges: null,
        topThree: []
      },
      {
        index: 3,
        name: '原创榜',
        playlist: null,
        privileges: null,
        topThree: []
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //飙升榜promise,新歌榜promise,原创榜promise,热歌榜promise
    Promise.all([songlistModel.getSoaringList(), 
                 songlistModel.getNewSongList(), 
                 songlistModel.getHotSongList(),
                 songlistModel.getOriginalList()])
      .then(res => {
        this.setData({
          'songlist[0].playlist': res[0].playlist,
          'songlist[0].privileges': res[0].privileges,
          'songlist[1].playlist': res[1].playlist,
          'songlist[1].privileges': res[1].privileges,
          'songlist[2].playlist': res[2].playlist,
          'songlist[2].privileges': res[2].privileges,
          'songlist[3].playlist': res[3].playlist,
          'songlist[3].privileges': res[3].privileges
        })
        //获取飙升榜前三名的歌曲id
        const soaringTopIds = this._getTopThreeId(0)
        return songDetailModel.getSonglistDetail(soaringTopIds)
      })
      .then(res => {
        // console.log(res)
        this.setData({
          'songlist[0].topThree': res.songs
        })
        //获取新歌榜前三名的歌曲id
        const newSongTopIds = this._getTopThreeId(1)
        return songDetailModel.getSonglistDetail(newSongTopIds)
      }).then(res => {
        // console.log(res)
        this.setData({
          'songlist[1].topThree': res.songs
        })
        //获取原创榜前三名的歌曲id
        const hotSongTopIds = this._getTopThreeId(2)
        return songDetailModel.getSonglistDetail(hotSongTopIds)
      }).then(res => {
        this.setData({
          'songlist[2].topThree': res.songs
        })
        //获取热歌榜前三名的歌曲id
        const originalTopIds = this._getTopThreeId(3)
        return songDetailModel.getSonglistDetail(originalTopIds)
      }).then(res => {
        this.setData({
          'songlist[3].topThree': res.songs
        })
      })
  },
  //根据榜单索引获取前三名的歌曲id
  _getTopThreeId(songlistIndex) {
    return this.data
               .songlist[songlistIndex]
               .playlist
               .trackIds
               .map((item, index) => {
                  if(index >= 3) {
                    return
                  }
                  return item.id
                })
               .filter(item => {
                  if(item) {
                    return item
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})