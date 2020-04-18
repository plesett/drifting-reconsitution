import Taro from '@tarojs/taro';
import { SaveUser } from './service';

export default {
  namespace: 'index',
  state: {
    UserInfo: {}
  },

  effects: {
    * SendUserInfo({ data }, { select, call, put }) {
      // const { title } = yield select(state => state.index) // 获取state里面的值
      const { token, uid } = yield call(SaveUser, data);
      Taro.setStorageSync('token', token);
      Taro.setStorageSync('uid', uid);
      yield put({
        type: 'SaveSendUserInfo',
        UserInfo: data
      })
    }
  },

  reducers: {
    SaveSendUserInfo(state, { UserInfo }) {
      return { ...state, UserInfo }
    }
  }
}