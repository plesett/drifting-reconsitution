
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { HomeProps, HomeState } from './home.interface'
import './home.scss'
import { Loading } from '../../components/Loading'
import { AtGrid, AtMessage } from 'taro-ui'
import { AlertMessage } from '../../components/AlertMessage'
import { AlertBottleMessage } from '../../components/AlertBottleMessage';
import Tips from '../../utils/tips';

const data = [
  {
    image: require('../../assets/get.png'),
    value: '捞瓶子'
  },
  {
    image: require('../../assets/out.png'),
    value: '扔瓶子'
  }
]

@connect(({ home }) => ({
  ...home,
}))
class Home extends Component<HomeProps, HomeState> {
  config: Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      isCatch: false,
      isThrow: false,
      isBottleMessage: false
    }
  }

  componentDidMount() {

  }

  handleOnclick = ({ }, index) => {
    const { isThrow } = this.state;
    const { dispatch } = this.props;
    if (index === 0) {
      if (isThrow) this.setState({ isThrow: false });
      this.setState({ isCatch: true });
      // 请求数据
      dispatch({
        type: 'home/GetBottleInfo'
      })
      setTimeout(() => {
        const { bottle } = this.props;
        if (bottle._id) {
          // 有瓶子信息
          this.setState({
            isCatch: false,
            isBottleMessage: true
          });
        } else {
          // 没有有瓶子信息
          this.setState({
            isCatch: false,
            isBottleMessage: false
          });
          Tips.toast('哎呀没有捡到瓶子哦~')
          // Taro.atMessage({
          //   'message': '网络超时',
          //   'type': 'warning',
          // })
        }
      }, 3000);
    } else {
      this.setState({ isThrow: true });
    }
  }

  render() {
    const { isCatch, isThrow, isBottleMessage } = this.state;
    return (
      <View className='home-body'>
        <Loading
          status={isCatch}
          text='捕捞中'
        />
        <View className='home-buttom'>
          <AtGrid
            mode='rect'
            hasBorder={false}
            columnNum={2}
            data={data}
            onClick={this.handleOnclick}
          />
          <AtMessage />
          {
            isBottleMessage &&
            <AlertBottleMessage
              isBottleMessage={() => this.setState({ isBottleMessage: false })}
            />
          }
        </View>
        {
          isThrow &&
          <AlertMessage
            setThrowFunc={(isThrow) => this.setState({ isThrow })}
          />
        }
      </View>
    )
  }
}

export default Home
