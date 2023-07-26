import http from "../utile/request"


export const getData = () => {
    return http.get('/Home/getData')
}


export const getUser = params =>{
    return http.get('/user/getUser',params)
}

export const addUser = (data) =>{
    return http.post('/user/add',data)
}

export const editUser = (data) =>{
    return http.post('/user/edit',data)
}


export const delUser = (data) =>{
    return http.post('/user/del',data)
}


export const getMenu = (data) =>{
    return http.post('/permission/getMenu',data)
}