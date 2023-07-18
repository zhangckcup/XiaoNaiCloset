// components/list/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: { type: String }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    types: ['洛丽塔', 'C服', 'JK', '汉服', '其他']
  },
  
  pageLifetimes: {
    async show() {
      let res;
      try {
        res = await wx.getStorage({
          key: "clothList"
        });
      } catch(err) {
        console.warn(err);
        res = { data: [] }
      }
       
      let data = res.data || [];
      if (this.data.types.includes(this.properties.type)) {
        data = data.filter((v: { type: string; }) => v.type === this.properties.type);
      }
      
      this.setData({
        list: data
      })
    },
  }
})
