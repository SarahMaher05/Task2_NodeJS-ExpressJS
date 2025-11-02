// middleware/auth.middleware.js


const isAuth = (req, res, next) => {
    
   
    if (req.session.userId) {
        next(); 
        
    } else {
        res.redirect('/auth/login');
    }
};


module.exports = isAuth;