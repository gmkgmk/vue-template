
        <script>
function init() {
    return {
        name: 'test',
        timeRange: []
    };
}
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('{{ moduleName }}/{{ pageName }}');


        export default {
  name: '{{ moduleName }}-{{ pageName }}-component',
  computed: { ...mapState({
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

  data: function () {
    return {
      loading: false,
      pageConfig: {},
      modelData: init(),
      schema: {
        fields: [{
          type: 'input',
          inputType: 'text',
          label: '姓名',
          model: 'name'
        }, {
          type: 'input',
          inputType: 'text',
          label: 'Name',
          model: 'name',
          placeholder: 'Your name'
        }, {
          type: 'select',
          label: 'Skills',
          model: 'name',
          options: [{
            value: '深圳仓库',
            key: 0
          }, {
            value: '广州仓库',
            key: 1
          }]
        }, {
          type: 'datePicker',
          dateType: 'daterange',
          'range-separator': '~',
          'start-placeholder': '开始日期',
          label: '时间选择',
          model: 'timeRange'
        }]
      }
    };
  },
  methods: {
    toClear() {
      this.modelData = init();
    },

    pageChange(newPageConfig) {
      this.pageConfig = _.cloneDeep(newPageConfig);
      this.fetchData();
    },

    async fetchData() {
      const param = { ...this.modelData,
        ..._.omit(this.pageConfig, ['total'])
      };
      this.loading = true;
      const {
        currentNo,
        totalElements
      } = await this.$store.dispatch({
        type: 'VUEX_NAME/FETCH_LIST',
        payload: param
      });
      this.loading = false;
      this.pageConfig = { ...this.pageConfig,
        currentNo,
        total: totalElements
      };
    }

  },

  render() {
    const action = {
      default: function () {
        return [<el-button type='text'>删除</el-button>];
      }
    };
    return <div class='vue-wrapper'>
                <el-form-generator schema={this.schema} model-data={this.modelData}>
                    <el-form-item>
                        <el-button type='primary'>查询</el-button>
                        <el-button type='text' onClick={this.toClear}>
                            清除搜索条件
                        </el-button>
                    </el-form-item>
                </el-form-generator>
                <div class='content-wrapper'>
                    <el-table data={this.tableData} stripe border><el-table-column label="姓名" prop="nickName"></el-table-column><el-table-column label="年龄" prop="age" scopedSlots={{
            default: props => {
              return [this.toFinancialNum(props.row.age, 2)];
            }
          }}></el-table-column></el-table>
                    <BasePagination pageConfig={this.pageConfig} onpageChange={this.pageChange} />
                </div>
            </div>;
  }

};
        </script>

    