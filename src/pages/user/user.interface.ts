
/**
 * user.state 参数类型
 *
 * @export
 * @interface UserState
 */
export interface UserState {}

/**
 * user.props 参数类型
 *
 * @export
 * @interface UserProps
 */
export interface UserProps {
    Authorization?: boolean;
    UserInfo?: {
        avatarUrl: string;
        nickName: string;
    }
}
