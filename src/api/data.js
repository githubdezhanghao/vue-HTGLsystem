import axios from './axios'

export const getMenu = (param) =>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}
export const gettableData = () =>{
    return axios.request({
        url:'http://localhost:5800/tableData'
    })
}

export const getuserData = () =>{
    return axios.request({
        url:'http://localhost:5800/userData'
    })
}
export const getorderData = () =>{
    return axios.request({
        url:'http://localhost:5800/orderData'
    })
}
export const getvideoData = () =>{
    return axios.request({
        url:'http://localhost:5800/videoData'
    })
}

// export const getData = () =>{
//     return axios.request({
//         url:'http://localhost:5800/tableData',
//         url:'http://10.70.10.107:5800/userData',
//         url:'http://10.70.10.107:5800/videoData',
//         url:'http://10.70.10.107:5800/orderData'
//     })
// }

export const getUser = (params) =>{
    return axios.request({
        url:'/user/getUser',
        method:'get',
        params
    })
}
