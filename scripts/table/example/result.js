<el-table-column label="姓名" prop="name"></el-table-column>
<el-table-column label="性别" prop="sex"></el-table-column>
<el-table-column label="年龄" prop="age"></el-table-column>
<el-table-column label="地区" prop="local" scopedSlots={{
  default: props => {
    return [father.toNumber(props.row.local, 4)];
  }
}}></el-table-column>