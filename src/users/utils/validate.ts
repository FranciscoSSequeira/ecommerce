export function validateUser(user: any):boolean{
    const validUser =
        user.name &&
        user.email &&
        user.password &&
        user.address &&
        user.phone 
    
    return validUser
}