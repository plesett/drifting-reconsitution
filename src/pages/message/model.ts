
// import Taro from '@tarojs/taro';
import * as messageApi from './service';

export default {
  namespace: 'message',
  state: {
    isLongPress: [
      {
        id: 0,
        state: false
      }
    ]
  },

  effects: {
    *GetUpdateIsLongPress({ data }, { call, put }) {
      yield put({
        type: 'UpdateIsLongPress',
        data: data
      })
    }
  },

  reducers: {
    UpdateIsLongPress(state, { data }) {
      return { ...state, ...data }
    }
  }
}