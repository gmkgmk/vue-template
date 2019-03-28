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
        save(state, { payload }) {
            Object.assign(state, payload);
        },
        reset: function(state) {
            Object.assign(state, init());
        }
    }
};
