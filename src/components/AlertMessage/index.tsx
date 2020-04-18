import Taro, { useState, Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTextarea, AtButton } from 'taro-ui'
import './index.scss'
import Tips from '../../utils/tips';
import { connect } from '@tarojs/redux'
import { SendBottleInfo } from '../../pages/home/service';

@connect(({ home }) => ({
  ...home,
}))
export class AlertMessage extends Component<{ setThrowFunc: (e: boolean) => void; dispatch?: any }, { value: string }> {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleSubMessage = () => {
    const { value } = this.state;
    if (value.length > 4) {
      Taro.getUserInfo({
        lang: 'zh_CN',
        success: (res) => {
          let data = Object.assign(res.userInfo, { message: value, uid: Taro.getStorageSync('uid') })
          console.log(data)
          SendBottleInfo(data).then(res => {
            if (res.message = value) {
              this.props.setThrowFunc(false)
              Tips.success('瓶子已扔入大海')
            } else {
              Tips.toast('啊呀错误了~')
            }
          })
        }
      })
    } else {
      Tips.toast('信息太短', () => {
        this.setState({ value: '' })
      })
    }
  }

  render() {
    const { setThrowFunc } = this.props;
    const { value } = this.state;
    return (
      <View className='AlertMessage-box'>
        <AtTextarea
          value={value}
          onChange={(e: any) => this.setState({ value: e })}
          maxLength={200}
          placeholder='请输入瓶子内容...'
        />
        <View className='at-row'>
          <View className='at-col at-col-6'>
            <AtButton
              type='secondary'
              size='small'
              onClick={this.handleSubMessage}
            >确定</AtButton>
          </View>
          <View className='at-col at-col-6'>
            <AtButton
              type='secondary'
              size='small'
              onClick={() => setThrowFunc(false)}
            >取消</AtButton>
          </View>
        </View>
      </View>
    )
  }
}