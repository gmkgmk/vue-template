<script>
import SideBarItem from './sideBarItem.vue';
const menuList = [
  {
    path: 'menu1',
    name: 'Menu1',
    meta: { title: 'Menu 1', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'menu1-1',
        name: 'Menu1-1',
        meta: { title: 'Menu 1-1' }
      },
      {
        path: 'menu1-2',
        name: 'Menu1-2',
        meta: { title: 'Menu 1-2' },
        children: [
          {
            path: 'menu1-2-1',
            name: 'Menu1-2-1',
            meta: { title: 'Menu 1-2-1' }
          },
          {
            path: 'menu1-2-2',
            name: 'Menu1-2-2',
            meta: { title: 'Menu 1-2-2' }
          }
        ]
      },
      {
        path: 'menu1-3',
        name: 'Menu1-3',
        meta: { title: 'Menu 1-3' }
      }
    ]
  },
  {
    path: 'menu2',
    name: 'Menu2',
    meta: { title: 'Menu 2' }
  }
];
export default {
  name: 'aside-component',
  methods: {
    sideBar(children) {
      return children.map(el => <SideBarItem item={el} key={el.path} basePath={el.path} />);
    }
  },
  render() {
    return (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-row class="tac">
          <el-col span={24}>
            <el-menu
              background-color="rgb(48, 65, 86)"
              text-color="rgb(191, 203, 217)"
              active-text-color="#409EFF"
            >
              {this.sideBar(menuList)}
            </el-menu>
          </el-col>
        </el-row>
      </el-scrollbar>
    );
  }
};
</script>
