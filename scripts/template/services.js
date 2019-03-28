import request from '~/common/js/request.js';
import apiConfig from '~/config/api.js';
const api = apiConfig.common;

export async function fetchList() {
    return request(`${api.list}`);
}
