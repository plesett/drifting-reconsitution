import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import "./utils/request";
import dva from './utils/dva'
import models from './models'
import { globalData } from "./utils/common";
import './app.scss'
import GoEasy from '../src/utils/goeasy-1.0.6';
import g from './utils/global';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/dialogue/dialogue'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  /**
 *
 *  1.小程序打开的参数 globalData.extraData.xx
 *  2.从二维码进入的参数 globalData.extraData.xx
 *  3.获取小程序的设备信息 globalData.systemInfo
 * @memberof App
 */
  async componentDidMount() {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo;
    const query = this.$router.params.query;
    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);
    // 
    this.goEasy()
  }

  goEasy = () => {
    new GoEasy({
      host: 'hangzhou.goeasy.io',
      appkey: 'BS-c0be3b7b70d44300bbe964c0046ef957',
      onConnected: function () {
        console.log('连接成功！')
      },
      onDisconnected: function () {
        console.log('连接断开！')
      },
      onConnectFailed: function (error) {
        console.log('连接失败或错误！')
      }
    });

    // //页面一加载就订阅
    // goEasy.subscribe({
    //   channel: 'BS-c0be3b7b70d44300bbe964c0046ef957',
    //   onMessage: function (message) {
    //     console.log(message)
    //   }
    // });
  
  } 

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
