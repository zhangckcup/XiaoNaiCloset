// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import { types } from "../../utils/constants";

Page({
  data: {
    tabs: ['全部', ...types],
    userInfo: {}
  },
  // 生命周期
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onAddTap() {
    wx.navigateTo({
      url: "/pages/addPage/index",
      success(res) {
        console.log("pages/addPage/index ok", res);
      },
      fail(err) {
        console.log("pages/addPage/index error",err);
      }
    });
  }
})
