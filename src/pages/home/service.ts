
import { Request } from '../../utils/request'
import ApiBottle from './config'

export const GetBottle = () => {
  // console.log(Request.creatRequests(ApiBottle.ApiBottle)())
  return Request.getApi({
    url: ApiBottle.ApiBottle,
    data: null,
    method: 'GET'
  })
}

export const SendBottleInfo = (data: object) => {
  // Request.creatRequests(ApiBottle.ApiSendBottleInfo)
  // return Request.getApiList({ ApiSendBottleInfo: '/bottle'}).ApiSendBottleInfo()
  return Request.getApi({
    url: ApiBottle.ApiSendBottleInfo,
    data: data,
    method: 'POST'
  })
}