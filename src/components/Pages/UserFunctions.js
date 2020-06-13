import axios from 'axios'

export const register = newUser => {
    if (newUser.password !== newUser.password_confirmation){
        alert("Fuck you");
    }
    else{
        return axios
        .get('/sign_up/'.concat(newUser.account, '/', newUser.password, '/', newUser.name))
        .then(response => {
            //successful
            if(response.data.result === 0){
                console.log('Registered')
            }
            //error
            else if (response.data.result === -1){
                console.log("fuck you error");
            }
            //duplicate
            else if (response.data.result === 1){
                console.log("fuck duplicate");
            }
            return response.data.result;
        })
        .catch(error => {
            console.log("Unknown error", error);
        })
    }
    
}

export const login = user =>{
    return axios
    .get('/get_login/'.concat(user.account))
    .then(response =>{
        //Successful
        if(user.password === response.data.password){
            localStorage.setItem('usertoken', response.config)
            console.log('login success');
            return 1;
        }
        else{
            console.log('login failed')
            return 0;
        }
        
    })
    .catch(err => {
        console.log(err)
    })
}