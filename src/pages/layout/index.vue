<script>
import Aside from './aside.vue';
import Header from './header.vue';
export default {
  name: 'layout',
  components: {
    'aside-component': Aside,
    'header-component': Header
  },
  render() {
    return (
      <el-container>
        <el-header class="header-wrapper" height="100px">
          <header-component />
        </el-header>
        <el-container>
          <el-aside width="500" class="side-wrapper">
            <aside-component />
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    );
  }
};
</script>

<style scope>
.header-wrapper {
  background: #ccc;
  text-align: center;
  line-height: 100px;
}
.side-wrapper {
  background: #ddd;
  text-align: center;
  height: calc(100vh - 100px);
}
</style>
