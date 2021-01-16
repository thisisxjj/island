// components/songlist-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coverImgUrl: {
      type: String,
      value: ''
    },
    creator: {
      type: Object,
      value: null
    },
    text: {
      type: String,
      value: ''
    },
    playCount: {
      type: Number,
      value: 0
    },
    name: {
      type: String,
      value: ''
    },
    loading: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  attached: function() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
