import Taro, { Component } from '@tarojs/taro';
import { View, Button, Image } from '@tarojs/components';
import { AtModal, AtModalContent, AtModalAction, AtAvatar } from "taro-ui"
import './index.scss'
import { connect } from '@tarojs/redux'

interface IAlertBottleMessageProps {
	bottle?: any
	isBottleMessage: () => void;
}

@connect(({ home }) => ({
	...home,
}))
export class AlertBottleMessage extends Component<IAlertBottleMessageProps> {
	handleReply = () => {
		const { bottle } = this.props;
		// 本地存储中建立数据
		// 先获取本地聊天列表
		// 把该用户写进去
		let chat = Taro.getStorageSync('chat');
		if (!chat) {
			// 为空
			console.log(1)
			let ChartArr: Array<object> = []
			ChartArr.push(bottle)
			Taro.setStorageSync('chat', ChartArr)
		} else {
			// 不是空
			console.log(2)
			chat.push(bottle)
			Taro.setStorageSync('chat', chat)
		}

		// 与服务端建立 及时通讯
		// 跳转聊天列表
		// 向服务端发送数据修改瓶子信息 已经被捡起 
	}
	render() {
		const { _id, avatarUrl, nickName, gender, province, city, message } = this.props.bottle;
		return (
			<AtModal closeOnClickOverlay={false} isOpened>
				<AtModalContent>
					<View className='at-row'>
						<View className='at-col at-col-3'>
							<AtAvatar
								size='small'
								circle
								image={avatarUrl}
							/>
						</View>
						<View className='at-col at-col-9'>
							<View style='font-size: 15px'>{nickName} <Image
								src={gender === 1 ? require('../../assets/man.png') : gender === 2 ? require('../../assets/nv.png') : ''}
								className='User_Images'
							/></View>
							<View style='color: #999'>{province} {city}</View>
						</View>
					</View>
					<View className='body_Text'>{message}</View>
				</AtModalContent>
				<AtModalAction>
					<Button onClick={this.props.isBottleMessage}>扔回海里</Button>
					<Button onClick={this.handleReply}>回复</Button>
				</AtModalAction>
			</AtModal>
		)
	}
}