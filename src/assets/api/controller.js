import request from '../utils/request';

/**
 * 获取电梯列表
 */
export const getElevators=()=>{
    return request({
        url:"/elevators",
        method:'post',
    })
}
