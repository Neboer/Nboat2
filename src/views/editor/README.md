# 博文编辑器
啊这个但疼的编辑器毁我青春

博文编辑器是现成的组件，由更小的组件和脚本等元素拼接而成。拼接的碎片脚本很多，给维护带来了相当大的困难。

同样的编辑器的布局和脚本（大框）都是完全相同的，只是内容上会根据目标和目的的不同而不同。
在管理员访问编辑器所在的路径的时候，编辑器会被根据要修改/编辑等的需要而被渲染填充。

由于能加载editor的一定是管理员，因此页面渲染默认为管理员视图。

## 编辑器

### meta编辑器
编辑大小博文的metadata

| meta| article|extra|预览markdown|预览list|
|:---- :|:------- :|: -----:|: ------ :|: -----: |
|*| | | |*|

编辑器的路径为`/<id>/metaEditor`
编辑器提交对应的api为`PUT /api/<id>/meta`

### article编辑器
啊这个但疼的article编辑器好tm复杂。
这个编辑器有三个作用：编辑大小博文的文章，向大博文中新建一个文章。

| meta| article|extra|预览markdown|预览list|
|:---- :|:------- :|: -----:|: ------ :|: -----: |
| |*| |*| |

编辑器的路径为
- 小博文编辑`/<id>/articleEditor`
- 大博文文章编辑`/<id>/<index>/articleEditor`
- 大博文新建文章`/<id>/articleCreator`

编辑器的api为
- 小博文编辑`PUT /api/<id>/article`
- 大博文文章编辑`PUT /api/<id>/<index>/article`
- 大博文新建文章`POST /api/<id>/newArticle`

### meta&article编辑器
用于更新一个小博文的meta和article。一个编辑器可以同时更新两个部分。

| meta| article|extra|预览markdown|预览list|
|:---- :|:------- :|: -----:|: ------ :|: -----: |
|*|*| |*|*|

编辑器的路径为`/<id>/fullEditor`
编辑器的api为`PUT /<id>/full`

### 全编辑器
用于创建一个新的博文，大小均可，拥有一切组件。

| meta| article|extra|预览markdown|预览list|
|:---- :|:------- :|: -----:|: ------ :|: -----: |
|*|*|*|*|*|

编辑器的路径为`/blogCreator`
编辑器的api为`POST /newBlog`
