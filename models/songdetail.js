import HTTP from '../api/http'

class SongDetailModel extends HTTP {
  //根据歌曲id数组获取歌曲详细信息
  getSongDetail(ids) {
    let idStr = this._arrayToString(ids)
    return this.request({
      url: 'song/detail',
      data: {
        ids: idStr ? idStr : ids
      }
    })
  }
  //根据歌曲id获取歌曲url
  getSongPlayUrl(ids) {
    let idStr = this._arrayToString(ids)
    return this.request({
      url: 'song/url',
      data: {
        id: idStr ? idStr : ids
      }
    })
  }

  //根据歌曲id判断音乐是否可用
  checkSongUrl(id) {
    return this.request({
      url: 'check/music',
      data: {
        id
      }
    })
  }

  _arrayToString(ids) {
    let idStr = ''
    if(Array.isArray(ids)) {
      ids.forEach((item, index) => {
        if(index < ids.length - 1) {
          idStr = idStr + item + ','
        } else {
          idStr = idStr + item
        }
      })
    }
    return idStr
  }
}

export default SongDetailModel