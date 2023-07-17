// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    tabs: ['全部', '洛丽塔', 'C服', 'JK', '汉服', '其他'],
    activeTab: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
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
  onTabClick() {

  },
  onChange() {

  }
})
