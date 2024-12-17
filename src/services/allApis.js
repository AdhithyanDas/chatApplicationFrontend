import base_Url from "./baseUrl";
import commonApi from "./commonApi";

export const registerApi = async (data) => {
    return await commonApi(`${base_Url}/reg`, 'POST', "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_Url}/log`, 'POST', "", data)
}

export const profileUpdateApi = async (data, header) => {
    return await commonApi(`${base_Url}/updateprofile`, 'PUT', header, data)
}

export const deleteaccountApi = async (email, header) => {
    return await commonApi(`${base_Url}/delaccount/${email}`, 'DELETE', header, {})
}

export const getUsersForSidebarApi = async (header) => {
    return await commonApi(`${base_Url}/home`, 'GET', header, "")
}