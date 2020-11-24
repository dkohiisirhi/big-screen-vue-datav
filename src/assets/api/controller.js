import request from '../utils/request';

/**
 * 获取电梯检修
 */
export const getElevatorIsOnline=()=>{
    return request({
        url:"/elevator/isonline",
        method:'post',
    })
}
