var db=require('../dbconnection');
var task=
 {

    
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

    

    List_task:function(callback)
    { 
        const query = 'SELECT * FROM note';
        db.query(query, (err, results) => {
            if (err) throw err;
    
            if (results.length === 0) {
                return callback(null, { success: false, message: 'Invalid entries' });
            }
            else{
                console.log("result : ",results)
                const task = results[0];
                return callback(null, { success: true, results });

            }
});
              
    },
}  
module.exports=task;