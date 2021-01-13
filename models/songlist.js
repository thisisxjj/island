import HTTP from '../api/http'

class SonglistModel extends HTTP {
  url = 'playlist/detail'
  getSoaringList() {
    return this.request({
      url: this.url,
      data: {
        id: 19723756
      }
    })
  }

  getNewSongList() {
    return this.request({
      url: this.url,
      data: {
        id: 3779629
      }
    })
  }

  getOriginalList() {
    return this.request({
      url: this.url,
      data: {
        id: 2884035
      }
    })
  }

  getHotSongList() {
    return this.request({
      url: this.url,
      data: {
        id: 3778678
      }
    })
  }
}

export default SonglistModel