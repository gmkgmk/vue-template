<script>
  function init() {
    return {
      name: 'test',
      timeRange: []
    };
  }
  import _ from 'lodash';
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapActions } = createNamespacedHelpers('order/list');
  export default {
    name: 'order-list-component',
    computed: {
      ...mapState({
        tableData: state => state.tableData
      })
    },
    watch: {
      modelData: {
        handler() {
          this.pageConfig.currentNo = 1;
          this.debounceFetchList();
        },
        deep: true
      }
    },
    mounted() {
      this.fetchData();
      this.debounceFetchList = _.debounce(this.fetchData, 300);
    },
    data() {
      return {
        loading: false,
        pageConfig: {},
        modelData: init(),
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              label: '姓名',
              model: 'name'
            },
            {
              type: 'input',
              inputType: 'text',
              label: 'Name',
              model: 'name',
              placeholder: 'Your name'
            },
            {
              type: 'select',
              label: 'Skills',
              model: 'name',
              options: [
                {
                  value: '深圳仓库',
                  key: 0
                },
                {
                  value: '广州仓库',
                  key: 1
                }
              ]
            },
            {
              type: 'datePicker',
              dateType: 'daterange',
              'range-separator': '~',
              'start-placeholder': '开始日期',
              label: '时间选择',
              model: 'timeRange'
            }
          ]
        }
      }
    },
    methods: {
      ...mapActions(['FETCH_LIST']),
      async fetchData() {
        const param = {
          ...this.modelData,
          ..._.omit(this.pageConfig, ['total'])
        };

        this.loading = true;
        const { currentNo, totalElements } = await this.FETCH_LIST(param);
        this.loading = false;

        this.pageConfig = {
          ...this.pageConfig,
          currentNo,
          total: totalElements
        };

      },
      toClear() {
        this.modelData = init();
      },
      pageChange(newPageConfig) {
        this.pageConfig = _.cloneDeep(newPageConfig);
        this.fetchData();
      }
    },
    render() {
      const action = {
        default: function () {
          return [<el-button type="text">删除</el-button>];
        }
      }
      return (
        <div class="vue-wrapper">
          <el-form-generator schema={this.schema} model-data={this.modelData}>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="text" onClick={this.toClear}>
                清除搜索条件
            </el-button>
            </el-form-item>
          </el-form-generator>
          <div class="content-wrapper">
            <el-table data={this.tableData} stripe border>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column
                label="操作"
                scopedSlots={action}
              ></el-table-column>
            </el-table>
          </div>
        </div>
      );
    }
  };
</script>
