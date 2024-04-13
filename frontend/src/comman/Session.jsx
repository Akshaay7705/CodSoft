export const createSession = (sessionValue) => {
    return sessionStorage.setItem('user', sessionValue)
}  

export const getSession = () => {
    return sessionStorage.getItem('user')
}  

export const removeSession = () => {
    return sessionStorage.removeItem('user')
}  