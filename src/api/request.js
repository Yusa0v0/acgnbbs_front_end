import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如，添加身份验证信息
        // config.headers.Authorization = sessionStorage.getItem('token')
        const token = localStorage.getItem('token')
        if (!(token === null || token === 'null')) {
            config.headers.token = token;
        }

        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response.data
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error)
    }
)

// 封装请求集
const api = {
    // demo
    // getUserInfo: () => service.get('/user/info'),
    // login: (params) => service.post('/user/login', params),
    // logout: () => service.post('/user/logout'),
    // getGoodsList: (params) => service.get('/goods/list', { params }),
    // getGoodsDetail: (id) => service.get(`/goods/detail/${id}`),

    noticeList: () => service.get('/notice/noticeList'),
    //四个分类的列表
    animationPostList: (pageNum) => service.get(`/post/animationPostList/${pageNum}`),
    comicPostList: (pageNum) => service.get(`/post/comicPostList/${pageNum}`),
    gamePostList: (pageNum) => service.get(`/post/gamePostList/${pageNum}`),
    novelPostList: (pageNum) => service.get(`/post/novelPostList/${pageNum}`),

    //发布、删除帖子、获取帖子
    addPost: (id, title, categoryId, authorId, content, cover) => service.post('/post/addPost', { id, title, categoryId, authorId, cover, content }),
    deletePost: (userId, postId) => service.get(`/post/deletePost/${userId}/${postId}`),
    getWritePost: (postId) => service.get(`/post/getWritePost/${postId}`),

    //帖子详细列表
    postDetails: (id) => service.get(`/post/postDetails/${id}`),
    // 帖子评论
    postCommentList: (id, currectPage, pageSize) => service.get(`/comment/postCommentList/${id}/${currectPage}/${pageSize}`),
    addComment: (userId, postId, content) => service.post('/comment/addComment', { userId, postId, content }),
    deleteComment: (userId, commentId) => service.get(`/comment/deleteComment/${userId}/${commentId}`),

    //收藏
    addFavorite: (userId, postId) => service.get(`/favorite/addFavorite/${userId}/${postId}`),
    deleteFavorite: (userId, postId) => service.get(`/favorite/deleteFavorite/${userId}/${postId}`),
    checkFavorite: (userId, postId) => service.get(`/favorite/checkFavorite/${userId}/${postId}`),

    //喜欢
    addLike: (userId, postId) => service.get(`/like/addLike/${userId}/${postId}`),
    deleteLike: (userId, postId) => service.get(`/like/deleteLike/${userId}/${postId}`),


    //登录注册
    login: (username, password) => service.post('/user/login', { username, password }),
    loginByCaptcha: (username, password) => service.post('/user/loginByCaptcha', { username, password }),
    logout: () => service.post('/user/logout'),
    register: (username, phone, password, bio, gender) => service.post('/user/register', { username, phone, password, bio, gender }),

    //关注
    addFollow: (userId, followedId) => service.get(`/follow/addFollow/${userId}/${followedId}`),
    cancelFollow: (userId, followedId) => service.get(`/follow/cancelFollow/${userId}/${followedId}`),
    getIsFollowed: (fromId, toId) => service.get(`/follow/getIsFollowed/${fromId}/${toId}`),

    followList: (userId, currentPage, pageSize) => service.get(`/follow/followList/${userId}/${currentPage}/${pageSize}`),
    fansList: (userId, currentPage, pageSize) => service.get(`/follow/fansList/${userId}/${currentPage}/${pageSize}`),


    //签到
    sign: () => service.get('/sign/sign'),
    getSigned: (id) => service.get(`/sign/getSigned/${id}`),

    //排行
    scoreRank: () => service.get('/rank/scoreRankList'),
    signNumRank: () => service.get('/rank/signNumRankList'),
    fanNumRank: () => service.get('/rank/fanNumRankList'),
    postNumRank: () => service.get('/rank/postNumRankList'),
    commentNumRank: () => service.get('/rank/commentNumRankList'),

    //发送验证码
    sendCaptcha: (username) => service.get(`/user/sendCaptcha/${username}`),


    //用户主页
    getUserInfo: (id) => service.get(`/user/userInfo/${id}`),
    setUserInfo: (id, username, avatar, gender, bio) => service.post(`/user/userInfo`, { id, username, avatar, gender, bio }),

    userCommentList: (id, currectPage, pageSize) => service.get(`/comment/userCommentList/${id}/${currectPage}/${pageSize}`),
    userPostList: (id, currectPage, pageSize) => service.get(`/post/userPostList/${id}/${currectPage}/${pageSize}`),
    userFavoriteList: (id, currectPage, pageSize) => service.get(`/favorite/userFavoriteList/${id}/${currectPage}/${pageSize}`),
    //上传图片
    addImage: (formData) => service.post('/eduoss/fileoss', { formData }),
}

export default api