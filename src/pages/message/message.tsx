
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { MessageProps, MessageState } from './message.interface'
import './message.scss'
import { AtTabs, AtList, AtListItem, AtTabsPane, AtSwipeAction } from 'taro-ui'
import g from '../../utils/global';
var GoEasy = require('../../utils/goeasy-1.0.6');
const path = require("path");

// import { } from '../../components'
const tabList = [{ title: '消息' }, { title: '好友' }, { title: '通知' }]


@connect(({ message }) => ({
  ...message,
}))
class Message extends Component<MessageProps, MessageState> {
  config: Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: MessageProps) {
    super(props)
    this.state = {
      current: 0,
      opt: ''
    }
  }

  componentDidMount() {
    // 初始化构建 redux isLongPress
    // ...
    // Taro.request({
    //   url: 'http://localhost/'
    // }).then(res => {
    //   this.setState({
    //     opt: res.data.opt
    //   })
    // })

  };

  componentWillUnmount() {
    clearTimeout()
  }

  handleOClick = (index) => {
    Taro.navigateTo({
      url: `/pages/dialogue/dialogue?index=${index}`
    })
  }

  handleLongPress = () => {
    const { dispatch, isLongPress } = this.props;
    if (isLongPress === undefined) return;
    var arr: { id: number; state: boolean } = isLongPress;
    arr[0].state = !isLongPress[0].state
    dispatch({
      type: 'message/GetUpdateIsLongPress',
      data: arr
    })

    // setTimeout(() => {
    // this.handleLongPress({})
    // }, 3000);

  }

  render() {
    const { current } = this.state;
    const { isLongPress } = this.props;
    const chat = Taro.getStorageSync('chat');
    
    return (
      <View className='message-wrap'>
        <AtTabs
          animated={false}
          current={current}
          tabList={tabList}
          onClick={(e: number) => this.setState({ current: e })}
        >
          <AtTabsPane
            current={current}
            index={0}
          >
            <View>
              <AtList>

                {
                  chat ? chat.map((r, index) => {
                    return (
                      <AtSwipeAction
                        key={r._id}
                        // isOpened={isLongPress[0].state}
                        // disabled={isLongPress[0].state}
                        onClick={() => console.log('删除')}
                        options={[
                          {
                            text: '删除',
                            style: {
                              backgroundColor: '#FF4949'
                            }
                          }
                        ]}
                      >
                        <View
                          onLongPress={() => this.handleLongPress()}
                        >
                          <AtListItem
                            title={r.nickName}
                            note={r.message}
                            onClick={() => this.handleOClick(index)}
                            // extraThumb='http://47.101.206.144:7001/public/default_yg.png'
                            thumb={r.avatarUrl}
                          />
                        </View>
                      </AtSwipeAction>
                    )
                  }) : <View style='text-align: center;padding: 50px;'>暂无信息哦~</View>
                }

              </AtList>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View>
              <AtList>
                <AtListItem
                  title='你是猪？？？'
                  arrow='right'
                  thumb='http://47.101.206.144:7001/public/default_yg.png'
                />
                <AtListItem
                  title='派大星'
                  arrow='right'
                  thumb='http://47.101.206.144:7001/public/default_yg.png'
                />
                <AtListItem
                  title='是哇'
                  arrow='right'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              </AtList>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View>
              <AtList>
                <AtListItem
                  title='系统通知'
                  note='系统通知系统通知系统通知'
                  thumb='http://47.101.206.144:7001/public/default_yg.png'
                />
              </AtList>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Message
