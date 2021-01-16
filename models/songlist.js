import HTTP from '../api/http'

class SonglistModel extends HTTP {
  url = 'playlist/detail'
  //飙升榜
  getSoaringList() {
    return this.request({
      url: this.url,
      data: {
        id: 19723756
      }
    })
  }
  //新歌榜
  getNewSongList() {
    return this.request({
      url: this.url,
      data: {
        id: 3779629
      }
    })
  }
  //原创榜
  getOriginalList() {
    return this.request({
      url: this.url,
      data: {
        id: 2884035
      }
    })
  }
  //热歌榜
  getHotSongList() {
    return this.request({
      url: this.url,
      data: {
        id: 3778678
      }
    })
  }

  getSonglistById(id) {
    return this.request({
      url: this.url,
      data: {
        id
      }
    })
  }
}

export default SonglistModel