# 后端部分
后端部分只负责博客的“增、删、改”，存在于src/api文件夹内。分别对应create、delete和update三个文件部分。
input_schema是定义schema的地方，其他地方需要用到其中定义的变量来过滤/消毒用户输入的信息。