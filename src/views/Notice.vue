<template>
  <div class="notice">
    <h1>公告：</h1>
    <div>
      <h2>更新情况</h2>

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
