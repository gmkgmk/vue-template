
        <script>
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';


        export default {
  name: 'table-example-component',

  data() {
    return {
      tableData: []
    };
  },

  methods: {},

  render() {
    return (
      <div class="vue-wrapper">
        <div class="content-wrapper">
          <el-table data={this.tableData} stripe border fit highlight-current-row>
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="性别" prop="sex" />
            <el-table-column label="年龄" prop="age" />
            <el-table-column label="地区" prop="local" />
          </el-table>
        </div>
      </div>
    );
  }
};

        </script>

    