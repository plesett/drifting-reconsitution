
import { Request } from '../../utils/request'
import ApiSaveUser from './config';

export const SaveUser = (data) => {
  // return Api.ApiSaveUser(data, 'POST')
  return Request.getApi({
    url: ApiSaveUser.ApiSaveUser,
    data: data,
    method: 'POST'
  })
}