function validate(body,field){
    for(let i = 0; i < field.length; i++){
        if(!body[field[i]] || body[field[i]] == '')
            return false
    }
    return true;
}

module.exports = {validate}