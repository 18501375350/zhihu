var baseURL = '/api';   // 根路径
var latestNews =baseURL+'/api/4/news/latest'    // 最新消息
var beforeNews = baseURL+'/api/4/news/before/'  // 往日消息
var detail = baseURL+'/api/4/news/' // 新闻详情
var other = baseURL+'/api/4/story-extra/' // 新闻额外信息
var pinglun = baseURL+'/api/4/story/' // 评论
export default{
    latestNews,
    beforeNews,
    detail,
    other,
    pinglun
}