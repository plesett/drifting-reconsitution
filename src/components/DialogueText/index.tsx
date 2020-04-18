import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'
import { AtAvatar } from 'taro-ui'

const DialogueText = (props: { text: string, isMe?: boolean, image: string }) => {
  const { text, isMe, image } = props;
  return (
    <View className='DialogueText-box'>
      <View
        className='DialogueText-row'
        style={isMe ? 'flex-direction: row-reverse;' : ''}
      >
        <View style={`margin-${isMe ? 'left' : 'right'}: 15px;`}>
          <AtAvatar
            size='small'
            image={image}
            circle
          />
        </View>
        <View
          style={`width: 80%;position: relative;margin-${isMe ? 'left' : 'right'}: 46px;`}
        >
          {
            isMe ?
              <View className='DialogueText-icon-rigth'></View>
              :
              <View
                className='DialogueText-left'
                style={`border-right-color: ${isMe ? '' : '#fff'};`}
              ></View>
          }
          <View
            className='DialogueText-right'
            style={`background-color: ${isMe ? '' : '#fff'};color: ${isMe ? '#fff' : '#000'}`}
          >{text}</View>
        </View>
      </View>
    </View>
  )
}

export default DialogueText