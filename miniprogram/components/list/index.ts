import { types } from "../../utils/constants";

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
    buttons: [{ text: "取消"}, {text: "确认"}],
    dialogTitle: "是否删除这件衣服",
    dialogShow: false,
    deleteIndex: 0,
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
      if (types.includes(this.properties.type)) {
        data = data.filter((v: { type: string; }) => v.type === this.properties.type);
      }
      
      this.setData({
        list: data
      })
    },
  },

  methods: {
    onItemLongPress(event) {
      const { index, name } = event.currentTarget.dataset;
      this.setData({
        dialogShow: true,
        dialogTitle: `是否删除"${name}"？`,
        deleteIndex: index
      })
    },
    onDelete(event) {
      if (+event.detail.index === 1) {
        wx.getStorage({key: "clothList"}).then((res) => {
          const data = res.data;
          data.splice(this.data.deleteIndex, 1);
          this.setData({
            list: data
          });
          wx.setStorage({
            key: "clothList",
            data
          });
        });
      }
      this.setData({
        dialogShow: false
      });
    },
    onItemTap(event) {
      wx.navigateTo({
        url: `/pages/addPage/index?idx=${event.currentTarget.dataset.index}`,
        success(res) {
          console.log("pages/addPage/index ok", res);
        },
        fail(err) {
          console.log("pages/addPage/index error",err);
        }
      });
    }
  }
})
