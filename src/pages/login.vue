<template>
  <div>
    假装这是登录
  </div>
</template>
<script>
  function init() {
    return {};
  }

  export default {
    name: 'login-component',
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
      };
    },
    methods: {
      toClear() {}
    }
  };
</script>
