var db=require('../dbconnection');
var bcrypt=require('bcrypt')
var user=
 {
    Create_user:function(users_,callback)
    { 
        console.log("edaa moneeee")
        const {firstname,lastname,gender,email,phone,username,password,dob,photo} = users_ ;
        
      //  if (!firstname||!lastname||!gender||!email||!phone||!username || !password||!photo) {
      //   return res.status(400).send('fill the form');
      // }
    
      // if (password.length < 8 || username.length<3) {
      //   return res.status(400).send('Password must be at least 8 characters long and username must be at least 3 characters long');
      // }
      
      
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const photo="sample"
        const query = 'INSERT INTO user (firstname,lastname,gender,email,phone,username,password,dob,photo) VALUES (?,?,?,?,?,?,?,?,?)';
        return db.query(query, [firstname,lastname,gender,email,phone,username,hash,dob,photo], callback);
      })    
    },
    List_user:function(callback)
    { 
        const query = 'SELECT * FROM user';
        return db.query(query, callback);
              
    },
    Login_user: function(username, password, callback) {
        // Basic validation - Check if username and password are provided
        if (!username || !password) {
            return callback(null, { success: false, message: 'Username and password are required' });
        }
    
        const query = 'SELECT * FROM user where username=?';
        db.query(query, [username], (err, results) => {
            if (err) throw err;
    
            if (results.length === 0) {
                return callback(null, { success: false, message: 'Invalid username or password' });
            }
    
            const user = results[0];
            console.log(user);
    
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
    
                if (result) {
                    // Password is correct
                    return callback(null, { success: true, user });
                } else {
                    // Password is incorrect
                    return callback(null, { success: false, message: 'Invalid username or password' });
                }
            });
        });
    },
    
    Create_task:function(task_,callback)
    { 
        console.log("task created")
        const {title,content,category} = task_ ;
        
       if (!title||!content) {
        return res.status(400).send('fill the form');
      }
    
        const query = 'INSERT INTO note (title,content,category) VALUES (?,?,?)';
        return db.query(query, [title,content,category], callback);      
    },

    

    List_task:function(userid,callback)
    { 
        const query = 'SELECT * FROM note WHERE userid = ?';
        db.query(query, [userid], (err,result)=>{
            if(err){
                console.error("error displaying tasks",err);
                return callback(err, null);
            }
            console.log("Task Listed Successfully");
            return callback(null, result);
        });              
    },
}  
module.exports=user;