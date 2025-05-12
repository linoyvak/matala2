const validation = {
    username:{
        required  : "field is require",
        minLength : {value:4  , message:"must between 4 - 10"},
        maxLength : {value:10 , message:"must between 4 - 10"},
    },
    password:{
        required  : "field is require",
        minLength : {value:6  , message:"must between 6 - 20"},
        maxLength : {value:20 , message:"must between 6 - 20"},
    },
    passwordNoRequire:{
        minLength : {value:6  , message:"must between 6 - 20"},
        maxLength : {value:20 , message:"must between 6 - 20"},
    },
    email:{
        required  : "field is require",
    },
    title: {
        required  : "field is require",
        minLength:{value:4  , message:"must between 4 - 50"},
        maxLength:{value:50 , message:"must between 4 - 50"},
    },
    context: {
        required  : "field is require",
    }
}

export {validation};