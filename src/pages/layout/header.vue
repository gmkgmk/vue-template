<script>
export default {
  name: 'header-component',
  render() {
    return (
      <div class="navbar">
        <div class="right-menu">
          <span class="out-btn">退出</span>
        </div>
      </div>
    );
  }
};
</script>
<style scope>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.out-btn {
  font-size: 14px;
  cursor: pointer;
}
.right-menu {
  padding-right: 30px;
  float: right;
  height: 100%;
  line-height: 50px;
}
</style>
