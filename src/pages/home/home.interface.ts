
/**
 * home.state 参数类型
 *
 * @export
 * @interface HomeState
 */
export interface HomeState {
    isCatch: boolean;
    isThrow: boolean;
    isBottleMessage: boolean;
}

/**
 * home.props 参数类型
 *
 * @export
 * @interface HomeProps
 */
export interface HomeProps {
    dispatch?: any;
    bottle?: any;
}
