import HTTP from '../api/http'

class ToplistDetailModel extends HTTP {
  url = 'toplist/detail'
  //根据歌曲id数组获取歌曲详细信息
  getToplistDetail() {
    return this.request({
      url: this.url
    })
  }
}

export default ToplistDetailModel