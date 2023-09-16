const {getUsers}=require('../Api/userApi')

exports.getNextId = async () => {
    const api = await getUsers();
    const users=await api.data
    return users.length+1      
}

exports.getUser = async username => {
    const api = await getUsers();
    const users=await api.data
    const user=users.find((u)=>{
        return u.username===username
    })
    if(!user) return null
    return user      
}

exports.getUserById = async id => {
    const api = await getUsers();
    const users=await api.data
    const user=users.find((u)=>{
        return u.id==id
    })
    if(!user) return null
    return user      
}

this.getNextId().then(id=>console.log(id))
