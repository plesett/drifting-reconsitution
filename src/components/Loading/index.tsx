import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import { AtActivityIndicator } from 'taro-ui'

export const Loading = (props: { text?: string, status: boolean }) => {
	const { text = '加载中', status } = props;
	return (
		<View className='loading'>
			{status &&
				<View className='loading-box'>
					<View>
						<AtActivityIndicator mode='center' content={text} />
					</View>
				</View>
			}
		</View>
	)
}