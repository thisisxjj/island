// components/songlist-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toplistPre: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      // console.log('event', event)
      this.triggerEvent('toplisttap', {
        tid: this.properties.toplistPre.id
      })
    }
  }
})
