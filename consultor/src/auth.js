export const isAuthenticated = () => {
    const userName = localStorage.getItem('userName')
    const password = localStorage.getItem('password')

    if(userName === 'admin' && password === 'admin') {
        return true
    
    }else {
        alert('Usuário ou senha incorretos.')

        return false
    } 
}