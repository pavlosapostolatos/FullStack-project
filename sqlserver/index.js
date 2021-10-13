const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const cors = require('cors')
const mysql = require('mysql')
const app = express();
app.use(express.json());


const fetch = require("node-fetch");

app.use(cors(
    {
        origin:true,
        methods: ["GET","POST"],
        credentials : true
    }));


const connection= mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'pavlos',
    database : 'linked_in',
    insecureAuth : false,
    multipleStatements: true
});


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "./");},
        filename:function(req,file,cb){
            const ext =file.mimetype.split("/")[1];
            const va = 'uploads/' + file.originalname;
            cb(null,va);
        }
});

const upload = multer({
    storage :storage
});





connection.connect(err =>{
    if(err){
        console.log(err);
        return err;
    }
    else console.log('connection successful')
});
// console.log(connection );
app.get('/', (req,res) =>{
    res.send('hello from products');
});
//BONUS//

app.get("/matrix_factorization", async (req, res) => {
    var temp,posts,aggelies,friend_posts,K;
    function get_user_likes (user_id){//these functions all use the temp variable to return the value of interest and return the javascript Promise object so this app can wait for the mysql query to finish. ignore them as they are boiler plate
        var st = "http://localhost:4000/alllikes" + "?user_id=" + user_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp= data)
        .catch((err) => console.error(err));
    }
    function get_user_comments (user_id){
        var st = "http://localhost:4000/commenter" + "?user_id=" + user_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp= data)
        .catch((err) => console.error(err));
    }
    function get_user_views (user_id){
        var st = "http://localhost:4000/user/id" + "?id=" + user_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp= data[0] )
        .catch((err) => console.error(err));
    }

    function get_posts_comments (post_id){
        var st = "http://localhost:4000/comments" + "?post_id=" + post_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp= data)
        .catch((err) => console.error(err));
    }

    function get_posts (){
        var st = "http://localhost:4000/posts";
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp=data )
        .catch((err) => console.error(err));
    }
    function get_aggelies(user_id){
        var st ="http://localhost:4000/aggelies" + "?user_id=" +user_id+ "&viewed=0";
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  aggelies=data )
        .catch((err) => console.error(err));
    }
    function get_friend_posts(user_id){
        var st ="http://localhost:4000/friendsposts" + "?user_id=" +user_id + "&viewed=0";
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  friend_posts=data )
        .catch((err) => console.error(err));
    }
    function has_user_commented(user_id,post_id){
        var st ="http://localhost:4000/has_user_commented" + "?user_id=" +user_id + "&post_id=" +post_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp=data )
        .catch((err) => console.error(err));
    }
    function has_user_liked(user_id,post_id){
        var st ="http://localhost:4000/likes" + "?user_id=" +user_id + "&post_id=" +post_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  temp=data )
        .catch((err) => console.error(err));
    }


    dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);// get dot profuct or array lines i.e 2 1d arrays(javascript list)
    const arrayColumn = (arr, n) => arr.map(x => x[n]);// get the nth column of an array as a (javascript list)

    function multiply(a, b) {//miltiply 2 2d arrays
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
          m[r] = new Array(bNumCols); // initialize the current row
          for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
              m[r][c] += a[r][i] * b[i][c];
              m[r][c]=  m[r][c];
            }
          }
        }
        return m;
      }
      
    function display(m) {
    for (var r = 0; r < m.length; ++r) {
        document.write('&nbsp;&nbsp;'+m[r].join(' ')+'<br />');
    }
    }//print array on console
    function matrix_factorization(R, P, Q, K, steps=5000, alpha=0.0002, beta=0.02){
    console.log("In")
    // console.log({R});
        // var t=0
        var eij;
    for(let i=0 ;i<steps;i++){//max iterations if error doesnt bring the 2 R arrays close enough
        for(let rows=0 ; rows<R.length ; rows++){
            for(let columns=0; columns<R[rows].length;columns++){
                if( R[rows][columns] > 0){
                    if(random==0)//these if/else statement do the same thing but avoid float overflow errors depending on if we picked random arrays or not
                        eij = R[rows][columns] - parseFloat(dot(P[rows],arrayColumn(Q, columns))).toFixed(5);//get the valuation for rows'th user for the column'th post
                    else
                        eij = R[rows][columns] - dot(P[rows],arrayColumn(Q, columns));//no need to multiply the whole array. we just need the multiply the rows reffering to the specific user and post. this an optimisation
                    for(let feature=0; feature<K;feature++){
                        if(random==0){//increment P and Q array parameters so in the next multiplication we get results closer to the real R
                            P[rows][feature] =  parseFloat(P[rows][feature] + alpha * (2 * eij * Q[feature][columns] - beta * P[rows][feature])).toFixed(5);
                            Q[feature][columns] =   parseFloat(Q[feature][columns] + alpha * (2 * eij * P[rows][feature] - beta * Q[feature][columns])).toFixed(5);
                        }
                        else{
                            P[rows][feature] =  P[rows][feature] + alpha * (2 * eij * Q[feature][columns] - beta * P[rows][feature]);
                            Q[feature][columns] =   Q[feature][columns] + alpha * (2 * eij * P[rows][feature] - beta * Q[feature][columns]);
                        }
                    }
                }
            }
        }
        let e = 0
        for(let rows=0 ;rows<R.length;rows++){//let e compute the error between real and experimental R
            for(let columns=0; columns<R[rows].length;columns++){
                if (R[rows][columns] > 0){
                    e = e + Math.pow(R[rows][columns] - dot(P[rows],arrayColumn(Q, columns)), 2)
                    for(let feature=0; feature<K;feature++){
                        e = e + (beta/2) * (Math.pow(P[rows][feature],2) + Math.pow(Q[feature][columns],2))
                    }
                }
            }
        }
        if (e < 0.001)//this breaks the first for loop if the two R arrays became almost identical. if this failed after #steps iterations give up and present the results
            break;
    }
    console.log("done");
    console.log({P,Q});

    return {P, Q};
    }


    const {user_id,random}= req.query;
    if(random==0){//based on social media data management
        var P = new Array(1);//one row for each user 
        // Loop to create 2D array using 1D array
        for (var i = 0; i < P.length; i++) {
            P[i] = new Array(3);
        }
        await get_user_likes(user_id);//these functions all use the temp variable to return the value of interest and return the javascript Promise object so this app can wait for the mysql query to finish
        P[0][0]=temp.length;
        await get_user_comments(user_id);
        P[0][1]=temp.length;
        await get_user_views(user_id);
        P[0][2]=temp.views;

        var Q = new Array(3);          
        // Loop to create 2D array using 1D array
        await get_posts();
        for (var i = 0; i < Q.length; i++) {//1 column for each post
            Q[i] = new Array(temp.length);
        }
        var post_counter=temp.length;
        posts=temp;
        for (var i = 0; i < post_counter; i++) {
            Q[0][i]=posts[i].likes;
            Q[2][i]=posts[i].views;
            await get_posts_comments(posts[i].id);
            Q[1][i]=temp.length;//get how many comments each post has
        }
        await get_aggelies(user_id);
        await get_friend_posts(user_id);
        var R = new Array(1);          
        // Loop to create 2D array using 1D array
        // await get_posts();
        for (var i = 0; i < R.length; i++) {//length=1
            R[i] = new Array(post_counter);
        }
        aggelies=aggelies.map( function(aggelies) { return aggelies.id; });
        friend_posts=friend_posts.map( function(friend_posts) { return friend_posts.id; });
        console.log({aggelies,friend_posts});
        for (var i = 0; i < post_counter; i++) {
            if( !aggelies.includes(posts[i].id) && !friend_posts.includes(posts[i].id)) {
            R[0][i]= 0;//if a post isnt part of the user's homepage i.e not made by friends or in his listings tab its value is unknown 
            }
            else{
                await has_user_commented(user_id,posts[i].id);
                var commented=temp.length>0;
                await has_user_liked(user_id,posts[i].id);
                var liked=temp.length>0;
                R[0][i]=0.001 + 50*commented+ 20*liked;//else usew thsis formula that makes comments and liles more important respectively
            }
        }
        K=3;
    }
    else{//make  random arrays and test the algorithm
        K=5;
        function getRandomFloat(max) {
            return (Math.random() * max);
        }
        var P = new Array(10);//10 users 20 posts 5 latent features//increase will overflow javascript       
        for (var i = 0; i < P.length; i++) {
            P[i] = new Array(K);
            for (var j = 0; j < P[i].length; j++) {
                P[i][j] =getRandomFloat(20);
            }
        }
        var Q = new Array(K);          
        for (var i = 0; i < Q.length; i++) {
            Q[i] = new Array(20);
            for (var j = 0; j < Q[i].length; j++) {
                Q[i][j] =getRandomFloat(20);
            }
        }
        var R = new Array(10);          
        for (var i = 0; i < R.length; i++) {
            R[i] = new Array(20);
            for (var j = 0; j < R[i].length; j++) {
                R[i][j] = getRandomFloat(20);
                if (Math.random() < 0.3)
                R[i][j] =0;//30% chance for value to be unknown. matrix should be 30% sparse
            }
        }

    }
    console.log({P,Q});
    console.log({R});
    let results = matrix_factorization(R, P, Q, K);
    let nP = results.P;//experimental arrays
    let nQ = results.Q;
    let nR = multiply(nP,nQ);
    console.log({nR});//compare them in console if you want
    function stringify_array(arr){
        var arrText='';
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                arrText+=arr[i][j]+' ';
            }
            arrText+='<br>';
        }
        console.log({arrText});
        return arrText;
    }
    function subtrackt_arrays(a,b){
    return y = a.map(function(it, ind) {
        return x = it.map(function(item, index) {
          // In this case item correspond to currentValue of array a, 
          // using index to get value from array b
          return item - b[ind][index];
        })
        })
    }

    if(random==1){
        res.send( {data: subtrackt_arrays (R,nR) } ) ;//if random is selected show the difference of the 2 R arrays(their errors).do it by subtrackting each value. its better than comparing 100- numbers with our eyes
    }
    else{//return the top 5 unknown posts recommended by the algorithm
        var rated_posts=[];
        for (var i = 0; i < post_counter; i++) {
            if (R[0][i] ===0){
                rated_posts.push({post: posts[i],value : nR[0][i] });
            }
        }
        rated_posts.sort(function(first, second) {
            return second.value - first.value;
          });
        rated_posts=rated_posts.map( function(rated_posts) { return rated_posts.post; });
        rated_posts=rated_posts.slice(0,5);
        return res.json({
            data: rated_posts
        });
        }
})




//BONUS//


//---------------------------------------------------------------

const path = require('path');
app.use('/', express.static(path.join(__dirname, '/')));


app.post("/api/image", upload.single('image'),(req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else
    {
        const image = req.file.filename;

        console.log(image);

        const {id}= req.query;
        console.log(id);
        const sqlInsert = "UPDATE user SET image = ? WHERE id= ?;"

        connection.query(sqlInsert, [image,id], (err, result) => {
            if(err){
                console.log(err)
                result.send({msg: err})
            }
            if(result) {
                console.log("successfully uploaded");

                res.send({
                data: result,
                msg: 'Your image has been updated!'
            });
            }
        });
    }

});



app.post("/api/image/post", upload.single('image'),(req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})
    }
    else
    {
        const image = req.file.filename;
        console.log(image);
    }

});




app.get("/api/image", (req, res) => {
    const {id}= req.query;

    const sqlInsert = "SELECT * FROM user WHERE id = ? ;"

    connection.query(sqlInsert , [id] , (err, result) => {
        

        if(err){
            console.log(err)
            res.send({
                msg: err
            })
        }

        if(result){
            res.send({
                image: result[0].image,
            });
        }
    });
})




app.get("/api/image/post", (req, res) => {
    const {id}= req.query;

    const sqlInsert = "SELECT * FROM posts WHERE id = ? ;"

    connection.query(sqlInsert , [id] , (err, result) => {
        

        if(err){
            console.log(err)
            res.send({
                msg: err
            })
        }

        if(result){
            res.send({
                image: result[0].image,
            });
        }
    });
})









//----------------------------------------------------------------
app.get('/aggelies', async (req,res) =>{
    const {user_id,viewed}= req.query;
    var friendslist,interests,posts;
    function get_friends (){
        var st = "http://localhost:4000/friends" + "?user_id=" + user_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  friendslist=data )
        .catch((err) => console.error(err));
    }
    await get_friends();
    friendslist= friendslist.map( function(friendslist) { return friendslist.receiver; })
    // console.log(friendslist);
    function get_interests (){
        var st = "http://localhost:4000/user/id" + "?id=" + user_id;
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  interests=data[0].interests )
        .catch((err) => console.error(err));
    }
    await get_interests();
    interests=interests.split(" ");
    function get_posts (){
        var st = "http://localhost:4000/posts";
        return fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  posts=data )
        .catch((err) => console.error(err));
    }
    await get_posts();
    function findCommonElement(arr1, arr2) {
        return arr1.some(item => arr2.includes(item))
    }
    posts=posts.filter(post => post.subjects && ( friendslist.includes(post.author_id) || post.author_id===user_id || findCommonElement(interests, post.subjects.split(" "))  )  );
    if(viewed==1){
        posts_ids= posts.map( function(posts) { return posts.id; })
        if (posts.length){
            var INCREMENT_VIEWS_QUERY=`UPDATE posts SET views= views + 1 WHERE id IN (`;
            for (let i=0;i<posts_ids.length;i++){
                INCREMENT_VIEWS_QUERY+=`${posts_ids[i]}`
                if(i < posts_ids.length-1)
                INCREMENT_VIEWS_QUERY+=`,`
            }
            INCREMENT_VIEWS_QUERY+=`)`
            connection.query(INCREMENT_VIEWS_QUERY,(err,results) => {
                if( err)
                return res.send(err);
            })
        }
        var INCREMENT_USER_VIEWS_QUERY=`UPDATE user SET views= views + ${posts.length} where id=${user_id};`;
        connection.query(INCREMENT_USER_VIEWS_QUERY,(err,results) => {
            if( err)
            return res.send(err);
        })
    }
    return res.json({
        data: posts
    })
//filter
});

app.get('/posts', (req,res) =>{
    const SELELCT_ALL_POSTS_QUERY= "SELECT * FROM posts as p"+
    " join (select id as user_id,name from user) as u where p.author_id=u.user_id;";
    connection.query(SELELCT_ALL_POSTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});


app.get('/friendsposts',(req,res) =>{
    const {user_id,viewed}= req.query;
    var posts=[];

    const SELELCT_ALL_FRIENDS_POSTS_QUERY= 
    `CREATE OR REPLACE VIEW friendposts AS 
    SELECT *
    FROM posts as p where p.subjects is null and
     EXISTS (select receiver from 
    ( (SELECT receiver FROM linked_in.friend_requests where sender=${user_id} and accepted=1 union 
    SELECT sender FROM linked_in.friend_requests where receiver=${user_id} and accepted=1) 
    ) as f  where f.receiver=p.author_id ) OR p.author_id=${user_id} ;
    
    SELECT * FROM friendposts join (select id as user_id,name from user) as u where author_id=u.user_id;
    `
    connection.query(SELELCT_ALL_FRIENDS_POSTS_QUERY, [1, 2],(err,results) => {
        if( err)
        return res.send(err);
        else{
            posts=results[1];
            if(viewed==1){
                posts_ids= posts.map( function(posts) { return posts.id; })
                if (posts.length){
                    var INCREMENT_VIEWS_QUERY=`UPDATE posts SET views= views + 1 WHERE id IN (`;
                    for (let i=0;i<posts_ids.length;i++){
                        INCREMENT_VIEWS_QUERY+=`${posts_ids[i]}`
                        if(i < posts_ids.length-1)
                        INCREMENT_VIEWS_QUERY+=`,`
                    }
                    INCREMENT_VIEWS_QUERY+=`)`
                    connection.query(INCREMENT_VIEWS_QUERY,(err,results) => {
                        if( err)
                        return res.send(err);
                    })
                }
                var INCREMENT_USER_VIEWS_QUERY=`UPDATE user SET views= views + ${posts.length} where id=${user_id};`;
                connection.query(INCREMENT_USER_VIEWS_QUERY,(err,results) => {
                    if( err)
                    return res.send(err);
                })
            }
            return res.json({
                data: posts
            })
            // setValue(results[1]);
        }
    })
   

});

app.get('/posts/add', (req,res) =>{
    var {title,text,likes,author_id,subjects,image}= req.query;
    var id;
    //if(subjects.localeCompare("null")) subjects= `'${subjects}'`
    subjects ="null"; 
    const INSERT_POST_QUERY= `INSERT INTO posts (title,text,likes,author_id,image) VALUES ('${title}', '${text}', '${likes}','${author_id}', '${image}');
        SELECT * FROM posts WHERE ( title= "pavlos" && text= "pavlos2");`
    connection.query(INSERT_POST_QUERY,(err,results) => {
        if( err)
            return res.send(err);
        else{
            console.log("sssuuuucccc");
            return res.json({
                data: results
            }) 
        }
    })
});


app.get('/addd', (req,res) =>{
    const INSERT_POST_QUERY= `SELECT id FROM posts WHERE ( title= "pavlos" && text= "pavlos2");`
    connection.query(INSERT_POST_QUERY,(err,results) => {
        if( err)
            return res.send(err);
        else{
            console.log("sssuuuucccc");
            return res.json({
                data: results
            }) 
        }
    })
});


app.get('/user/signup', (req,res) =>{
    const {email,name,interests,professional_position,company,admin,password,image}= req.query;
    const INSERT_USER_QUERY= `INSERT INTO user (email,name,interests,professional_position,company,admin,password,image) 
    VALUES ('${email}', '${name}', '${interests}','${professional_position}','${company}',${admin},'${password}','${image}');`
    connection.query(INSERT_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.send('successfully added user')
        }
    })
});
app.get('/users', (req,res) =>{
    const FIND_USER_QUERY= `SELECT * FROM user`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/user/', (req,res) =>{
    const {email}= req.query;
    const FIND_USER_QUERY= `SELECT * FROM user WHERE email='${email}'`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/user/id', (req,res) =>{
    const {id}= req.query;
    const FIND_USER_QUERY= `SELECT * FROM user WHERE id='${id}'`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/user/signin', (req,res) =>{
    const {email,password}= req.query;
    const FIND_USER_QUERY= `SELECT * FROM user WHERE email='${email}'` + ` and password='${password}'`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/user/update', (req,res) =>{
    const {id,email,name,interests,professional_position,company,password}= req.query;
    const UPDATE_USER_QUERY= `UPDATE  user SET email = '${email}' , name = '${name}' , interests = '${interests}' , professional_position = '${professional_position}' , company = '${company}' , password = '${password}' WHERE id=${id}`
    connection.query(UPDATE_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});

app.get('/likes', (req,res) =>{
    const {user_id,post_id}= req.query;
    const FIND_USER_QUERY= `SELECT * FROM likedata WHERE user_id='${user_id}'` + ` and post_id='${post_id}'`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/alllikes', (req,res) =>{
    const {user_id}= req.query;
    const FIND_USER_QUERY= `SELECT * FROM likedata WHERE user_id='${user_id}'`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/dellike', (req,res) =>{
    const {likes,post_id,user_id}= req.query;
    const SET_LIKES_QUERY= `UPDATE posts SET likes = ${likes} where id=${post_id}`
    connection.query(SET_LIKES_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
    const DELETE_LIKE_QUERY = `delete from likedata where user_id = ${user_id} and post_id = ${post_id}`
    connection.query(DELETE_LIKE_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
    return res.send("done");

});
app.get('/newlike', (req,res) =>{
    const {likes,post_id,user_id}= req.query;
    const SET_LIKES_QUERY= `UPDATE posts SET likes = ${likes} where id=${post_id}`
    connection.query(SET_LIKES_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
    const INSERT_LIKE_QUERY = `insert into likedata (user_id,post_id) values (${user_id},${post_id})`
    connection.query(INSERT_LIKE_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
    return res.send("done");

});

app.get('/comments', (req,res) =>{
    const {post_id}= req.query;
    const SELELCT_ALL_COMMENTS_QUERY= `SELECT * FROM comments as c join (select id as user_id,name from user) as u where c.author_id=u.user_id and c.post_id=${post_id};`;////!!!!
    connection.query(SELELCT_ALL_COMMENTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/commenter', (req,res) =>{
    const {user_id}= req.query;
    const SELELCT_ALL_COMMENTS_QUERY= `SELECT * FROM comments WHERE author_id=${user_id};`;////!!!!
    connection.query(SELELCT_ALL_COMMENTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/has_user_commented', (req,res) =>{
    const {user_id,post_id}= req.query;
    const SELELCT_ALL_COMMENTS_QUERY= `SELECT * FROM comments WHERE author_id=${user_id} and post_id=${post_id}`;////!!!!
    connection.query(SELELCT_ALL_COMMENTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/comments/add', (req,res) =>{
    const {text,post_id,author_id}= req.query;
    const INSERT_COMMENT_QUERY= `INSERT INTO comments (text,likes,post_id,author_id) VALUES ('${text}', 0, '${post_id}','${author_id}');`
    connection.query(INSERT_COMMENT_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.send('successfully added comment')
        }
    })
});

app.get('/notifications/add', (req,res) =>{
    const {post_id,LikeCom,user_name,author_id}= req.query;
    var notify;
    if(LikeCom==1){
        notify =`user: ${user_name} liked one of your posts `;
    }
    else{
        notify=`user: ${user_name} commented on one of your posts `;
    }
    const INSERT_COMMENT_QUERY= `INSERT INTO notifications (notify,post_id,user_id) VALUES ('${notify}','${post_id}','${author_id}');`
    connection.query(INSERT_COMMENT_QUERY,(err,results) => {
    if( err)
        return res.send(err);
    else{
        return res.send('successfully added notification')
    }
    })
});

app.get('/notifications', (req,res) =>{
    const {user_id}= req.query;
    const SELELCT_ALL_NOTIFICATIONS_QUERY= `SELECT * FROM notifications as n where n.user_id=${user_id};`;
    connection.query(SELELCT_ALL_NOTIFICATIONS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/search', (req,res) =>{
    const {name}= req.query;
    const SEARCH_QUERY= `SELECT * FROM linked_in.user where name like '${name}%'`;
    connection.query(SEARCH_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/friends', (req,res) =>{
    const {user_id}= req.query;
    const SELELCT_ALL_FRIENDS_QUERY= ` select receiver,email,name from ( (SELECT receiver FROM linked_in.friend_requests where sender=${user_id} and accepted=1 union 
        SELECT sender FROM linked_in.friend_requests where receiver=${user_id}  and accepted=1) as f JOIN user as u ON f.receiver=u.id)`;
    connection.query(SELELCT_ALL_FRIENDS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});
app.get('/requests', (req,res) =>{
    const {user_id}= req.query;
    const SELELCT_ALL_REQUESTS_QUERY= `select u.id,f.id as req_id ,name from friend_requests as f join user as u on (sender=u.id) where f.receiver=${user_id} and f.accepted=0`;
    connection.query(SELELCT_ALL_REQUESTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/requests/add', (req,res) =>{
    const {sender_id,receiver_id}= req.query;
    const ADD_REQUEST_QUERY= `INSERT INTO friend_requests (sender,receiver,accepted) VALUES (${sender_id},${receiver_id},0)`;
    connection.query(ADD_REQUEST_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});

app.get('/requests/accept', (req,res) =>{
    const {req_id}= req.query;
    const SELELCT_ALL_REQUESTS_QUERY= `UPDATE friend_requests SET accepted=1 where id=${req_id}`;
    connection.query(SELELCT_ALL_REQUESTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});

app.get('/requests/delete', (req,res) =>{
    const {req_id}= req.query;
    const SELELCT_ALL_REQUESTS_QUERY= `delete from friend_requests where id=${req_id}`;
    connection.query(SELELCT_ALL_REQUESTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});
app.get('/unfriend', (req,res) =>{
    const {sender_id,receiver_id}= req.query;
    const UNFRIEND_QUERY= `DELETE FROM  friend_requests WHERE sender=${sender_id} and receiver=${receiver_id}`;
    connection.query(UNFRIEND_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});

app.get('/privacy', (req,res) =>{
    const {user_id}= req.query;
    const PRIVACY_QUERY= `SELECT * FROM  privacy_settings WHERE user_id=${user_id}`;
    connection.query(PRIVACY_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/privacy/initialise', (req,res) =>{
    const {user_id}= req.query;
    const PRIVACY_QUERY= `insert into privacy_settings (user_id) values(${user_id})`;
    connection.query(PRIVACY_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});

app.get('/privacy/update', (req,res) =>{
    const {user_id,field,value}= req.query;
    const UPDATE_PRIVACY_QUERY= `UPDATE privacy_settings SET  ${field}=${value} where user_id=${user_id}`;
    connection.query(UPDATE_PRIVACY_QUERY,(err,results) => {
        if( err)
        return res.send(err);
    })
});


app.get('/private_chat', (req,res) =>{
	const {usr1,usr2}= req.query;
    const FIND_USER_QUERY = ` 
    	CREATE OR REPLACE VIEW private_chat AS
		SELECT * FROM messenger 
		WHERE ((messenger.user1 = '${usr1}' AND messenger.user2 = '${usr2}' )
		 OR (messenger.user1 = '${usr2}' AND messenger.user2 = '${usr1}' ))`
    connection.query(FIND_USER_QUERY,(err,results) => {
        if(err)
        return res.send(err);
        else{
            res.send("done");
        }
    })
});

app.get('/select_chat', (req,res) =>{
    const FIND_USER_QUERY= `SELECT DISTINCT user2 FROM per `
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});


app.get('/insert_chat', (req,res) =>{
	const {usr1,usr2,date,message}= req.query;
    const FIND_USER_QUERY= `INSERT INTO messenger (message, user1 , user2, date)
		VALUES ('${message}', '${usr1}', '${usr2}','${date}'); `
    connection.query(FIND_USER_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            res.send("done");
        }
    })
});








app.get('/get_user_chat', (req,res) =>{
	const {usr}= req.query;

	const FIND_USER_QUERY2 = ` 

		CREATE OR REPLACE VIEW my_chat AS
		SELECT message,user1,user2,date FROM messenger 
		WHERE (messenger.user1 = '${usr}' OR messenger.user2 = '${usr}' );

    	CREATE OR REPLACE VIEW iso AS
		SELECT message,user1 FROM my_chat 
		WHERE (my_chat.user2 = '${usr}' );

		CREATE OR REPLACE VIEW isoo AS
		SELECT message,user2 FROM my_chat 
		WHERE (my_chat.user1 = '${usr}' );

		CREATE OR REPLACE VIEW per AS SELECT * FROM isoo union SELECT * FROM iso;
		`


    connection.query(FIND_USER_QUERY2,[2, 1],(err,results) => {
        if(err)
        return res.send(err);
    else{
            res.send("done");
        }
        
    })


});






app.get('/chat', (req,res) =>{
    const SELELCT_ALL_POSTS_QUERY= "SELECT * FROM my_chat ORDER BY date ASC";
    connection.query(SELELCT_ALL_POSTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});


app.get('/select_private', (req,res) =>{
    const SELELCT_ALL_POSTS_QUERY= "SELECT * FROM private_chat ORDER BY date ASC";
    connection.query(SELELCT_ALL_POSTS_QUERY,(err,results) => {
        if( err)
        return res.send(err);
        else{
            return res.json({
                data: results
            })
        }
    })
});






app.listen(4000,() =>{
  console.log('product server listening on port 4000')
});
// connection.connect();