// components/song-lyric/index.js
import { getLyricAndTimeList } from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric: String,
    currentTime: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentRow: 0,
    lyricAndTimeArr: [],
    lyricMove: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  observers: {
    'currentTime': function(value) {
      let time = Math.ceil(value)
      if(this.data.currentRow > 1) {
        this.setData({
          lyricMove: `top: -${(this.data.currentRow - 1) * 64}rpx`
        })
      }
      this.data.lyricAndTimeArr.forEach((element, index) => {
        if(element.time === time) {
          this.setData({
            currentRow: index
          })
        }
      });
    },
    'lyric': function(value) {
      if(value) {
        let lyricAndTimeArr = getLyricAndTimeList(value)
        this.setData({
          lyricAndTimeArr
        })
      }
    }
  }
})
