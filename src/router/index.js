// 配置路由的文件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import Home from '@/views/Home'
import UserInfo from '@/views/UserInfo'
import WritePost from '@/views/WritePost'
import Login from '@/views/Login'
import Register from '@/views/Register'
import PostList from '@/views/PostList'
import Rank from '@/views/Rank'

import PostDetails from '@/views/PostDetails'
import Test from '@/views/Test'

// import { component } from 'vue/types/umd';


export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {
                headerShow: true,
                footerShow: true,
                title: "首页"
            }
        },
        {
            path: "/writePost",
            component: WritePost,
            meta: {
                headerShow: false,
                footerShow: false,
                title: "写博客"
            }
        },
        {
            path: "/userInfo/:userId",
            component: UserInfo,
            meta: {
                headerShow: true,
                footerShow: true,
                title: "用户信息"
            }
        },
        {
            path: "/postList/:category",
            component: PostList,
            name: 'postList',
            meta: {
                headerShow: true,
                footerShow: true,
                title: "帖子列表"
            }
        },
        {
            path: "/rank",
            component: Rank,
            name: 'rank',
            meta: {
                headerShow: true,
                footerShow: true,
                title: "排行"
            }
        },
        {
            path: "/postDetails/:postId",
            component: PostDetails,
            meta: {
                headerShow: true,
                footerShow: true,
                title: "帖子详情"

            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                headerShow: true,
                footerShow: false,
                title: "登录"
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                headerShow: true,
                footerShow: false,
                title: "注册"
            }
        },
        {
            path: "/test",
            component: Test,
            meta: {
                headerShow: true,
                footerShow: false,
                title: "测试"
            }
        },
        {
            path: "*",
            redirect: "/home"
        },
    ]
})