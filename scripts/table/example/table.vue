
        
        
        <script>
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';


        
        
        export default {
  name: 'table-example-component',
  computed: {},
  watch: {},

  mounted() {},

  data: function() {
    return {
      tableData: []
    };
  },
  methods: {},

  render() {
    return (
      <div class="vue-wrapper">
        <div class="content-wrapper">
          <el-table data={this.tableData} stripe border fit highlight-current-row id="123">
            <el-table-column label="学习学习" prop="study" />
            <el-table-column label="采购价格" prop="price" />
            <el-table-column label="采购数量" prop="number" />
            <el-table-column label="采购金额" prop="amount" />
            <el-table-column
              label="运费（不含税）"
              prop="freightExcludingTax"
            />
            <el-table-column
              label="运费（含税）"
              prop="freightIncludingTax"
            />
          </el-table>
        </div>
      </div>
    );
  }
};

        </script>

    
    
    