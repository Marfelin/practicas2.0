import axios from 'axios'
import { url } from './constans'

export const Request = {
  async postMethod(params) {
    console.log('los parametros que llegan a ala api ', params.body)
    return await axios({
      method: 'post',
      url: `${url}${params.url}`,
      timeout: 30000,
      headers: {
        'Content-Type':
          'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data; application/json',
        Accept: 'application/json',
      },
      params: params.body
    }).then(function (response) {
      return response
    })
  }
}
