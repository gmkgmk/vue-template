<script>
import path from 'path';
import MenuItem from './item.vue';
export default {
  name: 'sidebar-item',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    sideBar(children) {
      return children.map(child => {
        return <sidebar-item key={child.path} item={child} index={this.resolvePath(child.path)} />;
      });
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  },
  render() {
    const item = this.item;
    return item.children ? (
      <el-submenu ref="subMenu" popper-append-to-body index={this.resolvePath(item.path)}>
        <MenuItem icon={item.meta.icon} title={item.meta.title} slot="title" />
        {this.sideBar(item.children)}
      </el-submenu>
    ) : (
      <el-menu-item key={item.path} index={this.resolvePath(item.path)}>
        {item.name}
      </el-menu-item>
    );
  }
};
</script>
