<template>
    <div class="vue-wrapper">
        <div >
          <el-form inline>
            <el-form-item label="姓名">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
            <el-form-item label="选择仓库：">
              <el-select placeholder="请选择" v-model="query.name">
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.id"
                  :label="warehouse.warehouseName"
                  :value="warehouse.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收货日期">
              <el-date-picker
                v-model="query.name"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="text" @click="toClear">清除搜索条件</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-wrapper">
          <el-table :data="tableData" stripe border>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>
<script>
function init() {
  return {}
}

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('order/list')

export default {
  name: 'example-component',
  computed: {
    ...mapState({
      tableData: state => state.tableData
    })
  },
  data: function() {
    return {
      query: init(),
      pageConfig: {},
      warehouseList: [
        {
          warehouseName: '深圳仓库',
          id: 0
        },
        {
          warehouseName: '广州仓库',
          id: 1
        }
      ]
    }
  },
  methods: {
    toClear() {}
  }
}
</script>
