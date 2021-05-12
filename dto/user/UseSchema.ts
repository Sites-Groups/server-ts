import Types from '..';

export default class UserSchema {
  private name: string;
  private password: string;
}

// export default {
//   /**
//    * 用户名
//    */
//   name: {
//     required: true,
//     type: Types.String,
//   },
//   /**
//    * 密码
//    */
//   password: {
//     required: true,
//     type: Types.String,
//   },
//   /**
//    * 头像
//    */
//   avatar: {
//     type: String,
//     default: 'http://sinacloud.net/ada.bucket/avatar/default.jpg',
//   },
//   /**
//    * 邮箱
//    */
//   email: {
//     required: true,
//     type: Types.String,
//   },
//   /**
//    * 性别 0: 女，1: 男, 3: 小猫咪
//    */
//   gender: {
//     type: Types.Number,
//     default: 3,
//   },
//   /**
//    * 上次登录时间
//    */
//   lastLoginTime: Types.Date,
//   /**
//    * 注册时间
//    */
//   registerTime: {
//     type: Types.Date,
//     default: Date.now(),
//   },
//   /**
//    * 个人简介
//    */
//   myDesc: {
//     type: Types.String,
//     default: '这个人很懒，居然没有写简介！',
//   },
//   /**
//    * 未来启用 - qq 登陆
//    */
//   unionid: String,
//   qqUserId: String,
//   /**
//    * 用户设置
//    */
//   setting: {
//     /**
//      * 是否接收通知
//      */
//     acessNotification: {
//       /**
//        * 点赞通知
//        */
//       upvote: {
//         default: false,
//         type: Types.Boolean,
//       },
//       /**
//        * 收藏通知
//        */
//       collection: {
//         default: true,
//         type: Types.Boolean,
//       },
//       /**
//        * 留言回复通知
//        */
//       message: {
//         default: true,
//         type: Types.Boolean,
//       },
//     },
//   },
//   /**
//    * 用户站点列表
//    */
//   mySites: {
//     defult: [],
//     type: Array({
//       /**
//        * 站点类别
//        */
//       siteType: Types.String,
//       /**
//        * 站点id
//        */
//       siteId: String,
//     }),
//   },
//   /**
//    * 我的收藏
//    */
//   myFavorite: {
//     type: Array({
//       /**
//        * 站点类别
//        */
//       siteType: Types.String,
//       /**
//        * 站点id
//        */
//       siteId: String,
//     }),
//     default: [],
//   },
//   /**
//    * 是否是管理员
//    */
//   admin: {
//     type: Boolean,
//     default: false,
//   },
//   /**
//    * 超级管理员
//    */
//   superAdmin: {
//     type: Boolean,
//     default: false,
//   },
// };
