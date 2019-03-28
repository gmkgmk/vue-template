<template>
  <el-container>
    <el-header>
      这是头部
    </el-header>
    <el-container>
      <el-aside width="200"> 这是侧边栏</el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import _ from 'lodash';

  import { createNamespacedHelpers } from 'vuex';

  export default {
    name: 'layout',
    data: function() {
      return {};
    }
  };
</script>
