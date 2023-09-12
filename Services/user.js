const {getUsers}=require('../Api/userApi')

exports.getUser = async username => {
    const api = await getUsers();
    const users=await api.data
    const user=users.find((user)=>{
        return user.username===username
    })
    if(!user) return null
    return user      
}
