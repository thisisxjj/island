import HTTP from '../api/http'

class SongDetailModel extends HTTP {
  url = 'song/detail'
  //根据歌曲id数组获取歌曲详细信息
  getSonglistDetail(ids) {
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
    return this.request({
      url: this.url,
      data: {
        ids: idStr ? idStr : ids
      }
    })
  }
}

export default SongDetailModel