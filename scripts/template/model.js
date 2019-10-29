const init = () => ({
  name: null,
  tableData: [{ name: '模拟数据1', id: 1 }, { name: '模拟数据2', id: 1 }]
});

export default {
  namespaced: true,
  state: {
    ...init()
  },
  mutations: {
    SAVE(state, { payload }) {
      Object.assign(state, payload);
    },
    RESET: function(state) {
      Object.assign(state, init());
    }
  },
  actions: {
    // 列表
    async FETCH_LIST({ commit }, { payload } = {}) {
      const { data } = await queryList(payload);
      commit({
        type: 'save',
        payload: { tableData: rows }
      });
      return data;
    }
  }
};
