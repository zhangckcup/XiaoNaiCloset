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
    clothType: ['洛丽塔', 'C服', 'JK', '汉服', '其他']
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
      data.push({
        type: this.data.type,
        img: this.data.imgList[0],
        name: this.data.clothName
      });
      
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