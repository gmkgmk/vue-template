<script>
import Aside from './sidebar/index.vue';
import Header from './header.vue';
export default {
  name: 'layout',
  components: {
    'aside-component': Aside,
    'header-component': Header
  },
  render() {
    return (
      <el-container class="app-wrapper">
        <el-aside width="210" class="side-wrapper">
          <div class="title-wrapper">
            <h1 class="title">后台管理系统</h1>
          </div>
          <aside-component />
        </el-aside>
        <el-container>
          <el-header class="header-wrapper" height="50">
            <header-component />
          </el-header>
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
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}
.header-wrapper {
  background: #ccc;
  text-align: center;
  position: relative;
  align-items: center;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.side-wrapper {
  width: 210px;
  background-color: #304156;
  height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.title-wrapper {
  display: flex;
  align-items: center;
  height: 64px;
}
.title {
  display: inline-block;
  margin: auto;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  vertical-align: middle;
  animation: fade-in;
  animation-duration: 0.3s;
}
</style>
<style>
.app-wrapper .el-menu {
  border: none;
}
.app-wrapper .el-submenu__title:hover,
.app-wrapper .submenu-title-noDropdown:hover {
  background-color: #263445 !important;
}
</style>
