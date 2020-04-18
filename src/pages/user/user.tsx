
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { UserProps, UserState } from './user.interface'
import './user.scss'
import { AtAvatar } from 'taro-ui'
// import { } from '../../components'

@connect(({ index }) => ({
    ...index,
}))
class User extends Component<UserProps,UserState > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: UserProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    const { Authorization, UserInfo } = this.props;
    if (UserInfo === undefined) return;
    const { avatarUrl, nickName } = UserInfo;
    return (
      <View className='user-wrap'>
        <View className='at-row user-Info'>
          <View className='at-col at-col-2'>
            <AtAvatar
              image={!Authorization ? avatarUrl : 'http://47.101.206.144:7001/public/default_yg.png'}
              circle
              size='large'
            />
          </View>
          <View className='at-col at-col-10'>
            {
              !Authorization ?
                <View className='user-name'>{nickName}<View className='user-mobile'>182****1057</View></View>
                :
                <View
                  className='user-name'
                >未登录<View className='user-mobile'>点击登录</View></View>
            }
          </View>
        </View>

        <View>
          <View className='at-row at-row__justify--between user-Menu-list'>
            <Image
              className='user-Menu-Img'
              src={require('../../assets/gerenziliao.png')}
            />
            <View className='at-col at-col-11'>编辑资料</View>
          </View>

          <View className='at-row at-row__justify--between user-Menu-list'>
            <Image
              className='user-Menu-Img'
              src={require('../../assets/chongzhi.png')}
            />
            <View className='at-col at-col-11'>充值管理</View>
          </View>

          <View className='at-row at-row__justify--between user-Menu-list'>
            <Image
              className='user-Menu-Img'
              src={require('../../assets/fenxaing.png')}
            />
            <View className='at-col at-col-11'>分享</View>
          </View>

        </View>
      </View>
    )
  }
}

export default User
