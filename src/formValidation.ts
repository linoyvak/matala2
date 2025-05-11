const validation = {
    username:{
        required  : "שדה זה חובה",
        minLength : {value:4  , message:"must between 4 - 10"},
        maxLength : {value:10 , message:"must between 4 - 10"},
    },
    password:{
        required  : "שדה זה חובה",
        minLength : {value:6  , message:"must between 6 - 20"},
        maxLength : {value:20 , message:"must between 6 - 20"},
    },
    passwordNoRequire:{
        minLength : {value:6  , message:"must between 6 - 20"},
        maxLength : {value:20 , message:"must between 6 - 20"},
    },
    email:{
        required : "שדה זה חובה",
    },
    title: {
        required:"שדה זה חובה",
        minLength:{value:4  , message:"must between 4 - 50"},
        maxLength:{value:50 , message:"must between 4 - 50"},
    },
    context: {
        required:"שדה זה חובה",
    }
}

export {validation};