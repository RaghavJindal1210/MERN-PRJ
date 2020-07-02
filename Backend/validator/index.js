exports.createPostValidator = (req,res,next) => {
    req.check('title','Write a title').notEmpty()
    req.check('title','Title must be between 5 -150 characters').isLength({
        min:4,
        max:150
    });
 
    req.check('body','Write a Body').notEmpty()
    req.check('body','Body must be between 5 -2000 characters').isLength({
        min:4,
        max:150
    });


    //check for errors 
    const errors = req.validationErrors()
    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    };
    //proceed to next errors
    next();
};

exports.userSignupValidator = (req,res,next) => {
    //Name 
    req.check('name',"Name is Required").notEmpty()
    //Email
    req.check('email',"Email must be 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength ({
        min: 4,
        max:2000
    })

    //Password
    req.check("password","Password is Required").notEmpty();
    req.check('password')
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters ")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    //Errors
    const errors = req.validationErrors()
    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    };
    //proceed to next errors
    next();
};