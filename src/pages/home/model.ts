
import Taro from '@tarojs/taro';
import * as homeApi from './service';
import { GetBottle } from './service';

export default {
  namespace: 'home',
  state: {
    bottle: {}
  },

  effects: {
    *GetBottleInfo(_, { call, put }) {
      const res = yield call(GetBottle);
      yield put({
        type: 'SaveGetBottleInfo',
        data: res
      })
    },
  },

  reducers: {
    SaveGetBottleInfo(state, { data }) {
      return { ...state, bottle: data}
    }
  }
}
