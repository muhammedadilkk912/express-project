const express=require('express')
const session=require('express-session')


const app=express()
const username1='muhammed'
const password1='12344321'
// Middleware to parse form data (URL- encoded and JSON)
app.use(express.urlencoded({ extended: true }));// For form data
app.use(express.json()); // For JSON payloads
app.set('view engine', 'hbs')
app.use(session({
    secret:'anything',
    resave:true,
    saveUninitialized:false,
    name:'adil'
}))
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '-1');
    next();
});


app.get('/', (req, res) => {
        if(req.session.user){
            console.log("hjdhh");
            
            res.redirect('/home')
    }else{
        res.render('login');

    }
     // Render 'views/login.hbs'
});
app.post('/verify',(req,res)=>{
    console.log(req.body);
    const{username,password}=req.body
    if(username1===username && password===password1){
        req.session.user=username
        res.redirect('/home')
    }
    else{
        if(username!=username1){
            user_error="invalid username"
        }else{
            user_error=""

        }
        if(password!=password1){
            pas_error="invalid password"
    
        }else{
            pas_error=""


        }
        res.render('login',{user_error,pas_error,username,password})

    }
   
    
    // console.log("dkbfjahhu");
    
   
})

app.get('/home', (req, res) => {
    if(req.session.user){
        res.render('home');

    }
    else{
        res.redirect('/');

    }
     // Render 'views/login.hbs'
});
app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
    console.log("bhdfb");
    
})


app.listen(1000,()=>{
    console.log("ther server running at 31");
    
})