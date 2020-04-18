import Taro, { useEffect } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtAvatar } from "taro-ui"
import { useDispatch } from '@tarojs/redux';

export const AlertAuthorization = (props: { title?: string; Image: string; text?: string; onGetUserInfo: (res: any) => void }) => {
	const { title = '授权', Image, text = '信息', onGetUserInfo } = props;
	const dispatch = useDispatch()
	const handleOut = () => {
		Taro.showModal({
			title: '警告',
			content: '点击退出小程序',
		}).then(res => {
			console.log(res)
		})
	}
	return (
		<AtModal closeOnClickOverlay={false} isOpened>
			<AtModalHeader>{title}</AtModalHeader>
			<AtModalContent>
				<View style='display: flex;justify-content: center;margin-bottom: 3%'>
					{
						Image !== undefined && <AtAvatar circle image={Image} />
					}
				</View>
				<View style='text-align: center;font-weight: bold;'>{`飞积木 请求获取您${text}`}</View>
			</AtModalContent>
			<AtModalAction>
				<Button
					open-type="getUserInfo"
					lang='zh_CN'
					onGetUserInfo={(res) => onGetUserInfo(res)}
				>确定</Button>
				<Button
					onClick={handleOut}
				>取消</Button>
			</AtModalAction>
		</AtModal>
	)
}