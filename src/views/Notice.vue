<template>
  <div class="notice">
    <h1>公告：</h1>
    <div>
      <h2>未实现的饼</h2>
      <ul>
        <li>举报功能</li>
        <li>个人视频管理</li>
      </ul>
      <h2>更新情况</h2>

      <el-card class="box-card">
        <h3 slot="header" class="clearfix">
          <span>v0.3.0</span>
        </h3>
        <ul>
          <li>音频投稿相关内容</li>
          <li>加入头像上传功能</li>
          <li>个人信息增加显示自己的稿件功能</li>
        </ul>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header" class="clearfix">
          <span>v0.2.1</span>
        </h3>
        <ul>
          <li>加入发表评论功能</li>
          <li>评论中临时的头像显示</li>
        </ul>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header" class="clearfix">
          <span>v0.2.0</span>
        </h3>
        <ul>
          <li>加入搜索功能，能搜索可用的视频和用户了</li>
          <li>投稿新加分区功能</li>
          <li>投稿可以选择自己上传还是通过url</li>
        </ul>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header" class="clearfix">
          <span>v0.1.0</span>
        </h3>
        <ul>
          <li>优化了token的存储，与后端交互更安全灵活</li>
          <li>在未登录状态下，投稿视频页会提醒。不展示表单</li>
          <li>公告内容开始撰写</li>
        </ul>
      </el-card>
    </div>
  </div>
</template>
