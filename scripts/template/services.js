import request from '~/utils/request.js';
import api from '~/api/index.js';
export async function queryList() {
  return request(`${api.list}`);
}
