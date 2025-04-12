import { Request } from 'express'
import BasicUserInfo from './BasicUserInfo'

export default interface CustomExpressRequest extends Request {
	user_info?: BasicUserInfo
}
