import { types } from "../../utils/constants";

// pages/addPage/index.ts
interface IImgDetail {
  tempFilePaths: any, 
  tempFiles: any, 
  contents: any
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    clothName: "",
    imgList: [],
    error: "",
    disabled: false,
    type: '洛丽塔',
    clothType: types,
    isEdit: false,
    editIndex: 0
  },

  onLoad(query) {
    if (query.idx) {
      wx.getStorage({key: "clothList"}).then(res => {
        const data = res.data[query.idx] || {};
        
        this.setData({
          isEdit: true,
          clothName: data.name,
          type: data.type,
          imgList: [data.img],
          editIndex: +query.idx || 0
        })
      });
    }
  },

  /**
   * 图片选择
   */
  imgSelect(img: { detail: IImgDetail; }) {
    const { detail } = img;
    const imgData = {
      url: detail.tempFilePaths[0]
    };
    this.setData({
      imgList: [imgData],
      disabled: false
    });
  },
  bindClothName({ detail: { value } }) {
    this.setData({
      clothName: value
    })
  },
  radioChange({ detail: { value }}) {
    this.setData({
      type: value
    });
  },
  async bindSubmit() {
    if (!this.data.imgList.length) {
      this.setData({
        error: "请上传衣服的美图哦",
        disabled: true
      });
    } else {
      const that = this;
      let res;
      try {
        res = await wx.getStorage<[]>({ key: "clothList" });
      } catch(err) {
        console.warn(err);
        res = { data: [] }
      }
      
      const data = res.data || [];
      if (this.data.isEdit) {
        data.splice(this.data.editIndex, 1, {
          type: this.data.type,
          img: this.data.imgList[0],
          name: this.data.clothName
        });
      } else {
        data.push({
          type: this.data.type,
          img: this.data.imgList[0],
          name: this.data.clothName
        });
      }
      
      
      wx.setStorage({
        key:"clothList",
        data,
        success() {
          wx.navigateBack();
        },
        fail(err) {
          console.warn(err);
          that.setData({
            error: "保存出现错误"
          });
        }
      })
    }
  }
})