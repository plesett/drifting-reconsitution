
/**
 * message.state 参数类型
 *
 * @export
 * @interface MessageState
 */
export interface MessageState {
    current: number;
    opt: string;
}

/**
 * message.props 参数类型
 *
 * @export
 * @interface MessageProps
 */
export interface MessageProps {
    isLongPress?: {
        id: number;
        state: boolean;
    };
    dispatch?: any;
}
