<template>
  <el-container>
    <el-header class="header-wrapper" height="100px">
      这是头部
    </el-header>
    <el-container>
      <el-aside width="200" class="side-wrapper"> 这是侧边栏</el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

  export default {
    name: 'layout',
    data: function() {
      return {};
    }
  };
</script>

<style scope>
  .header-wrapper {
    background: #ccc;
    text-align: center;
    line-height: 100px
  }
  .side-wrapper {
    background: #ddd;
    text-align: center;
    line-height: 100vm;
    height: calc(100vh - 100px)
  }
</style>
