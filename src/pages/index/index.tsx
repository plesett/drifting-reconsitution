import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import Home from '../home/home'
import Message from '../message/message'
import User from '../user/user'
import { AtTabBar } from 'taro-ui'
import { AlertAuthorization } from '../../components/AlertAuthorization'

@connect(({ index }) => ({
  ...index,
}))
class Index extends Component<IndexProps, IndexState> {

  config: Config = {
    navigationBarTitleText: '飞积木'
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      current: 0,
      isAuthorization: false
    }
  }

  componentDidMount() {
    // 判断本地是否有数据
    let value = Taro.getStorageSync('UserInfo')
    if (value) {
      this.setState({ isAuthorization: true })
      // 比对数据是否相同
      Taro.getUserInfo({
        lang: 'zh_CN',
        success: (res) => {
          // 对比用户是否更新数据
          if (JSON.stringify(res.userInfo) === JSON.stringify(value.userInfo)) {
            console.log('无差异')
            // 发送至服务端
            // 存入 reudux or token
            const { dispatch } = this.props;
            dispatch({
              type: 'index/SendUserInfo',
              data: res.userInfo
            })
          } else {
            console.log('有差异')
            // 表示用户信息已经修改
            Tips.toast('授权过期')
            // 清空本地
            Taro.clearStorage()
          }
        }
      })
    } else {
      // 清除本地缓存
      Taro.clearStorageSync()
      // 开启授权窗口
      this.setState({ isAuthorization: false })
    }
  }

  UserInfo = (res) => {
    // 当用户拒绝授权处理
    if (res.detail.errMsg === 'getUserInfo:fail auth deny') return;
    this.setState({ isAuthorization: true })
    const { dispatch } = this.props;
    dispatch({
      type: 'index/SendUserInfo',
      data: res.userInfo
    })
    // 存入本地
    Taro.setStorageSync('UserInfo', res.detail);
  }

  render() {
    const { current, isAuthorization } = this.state;
    return (
      <View>
        {
          current === 0 && <Home />
        }
        {
          current === 1 && <Message />
        }
        {
          current === 2 && <User />
        }
        {
          !isAuthorization &&
          <AlertAuthorization
            title='授权'
            onGetUserInfo={this.UserInfo}
            Image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
          />
        }
        <AtTabBar
          fixed
          tabList={[
            { title: '主页', iconType: 'bullet-list' },
            { title: '消息', iconType: 'message', text: 'new' },
            { title: '用户', iconType: 'user', text: '100' }
          ]}
          onClick={(value) => this.setState({ current: value })}
          current={current}
        />
      </View>
    )
  }
}

export default Index