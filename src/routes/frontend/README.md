# 博客前端渲染器
这里包含了负责渲染博客前端的路由，访问这些路由对应的页面的时候，会响应相应的页面HTML而
不仅仅是api了。这个路由是直接和用户交互的路由，用户只应该显式地访问这里的内容。

## 规范
传递给前端视图以渲染的参数列表：

### home
isAuthed

### list
/newest
- isAuthed
- blogList[]（完全按照大小博客的schema来传递，详情参阅database/model[]，同时应该注意转换一下id）
- totalPage（注意统计的时候考虑到用户的身份）
- currentPage

### blog 看博文
- isAuthed
- blog（把整个博客对象拿过来！我不嫌多！）
- articleIndex（当前用户访问页的index）

### editor 编辑博文
- blog（要编辑的博文全文发来！如果是新建博文，此项留空，插入文章也要有）
- articleIndex（如果要编辑大博文中的某篇文章，需要传递此篇文章的index）
