<el-table-column label="姓名" prop="nickName"></el-table-column>
<el-table-column label="年龄" prop="age" scopedSlots={{
  default: props => {
    return [this.toFinancialNum(props.row.age, 2)];
  }
}}></el-table-column>