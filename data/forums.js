const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const forums = mongoCollections.forums;
const users = mongoCollections.users;
const usersData = require('./users');
const MarkdownIt = require('markdown-it/lib');
const md = new MarkdownIt();

let exportedMethods = {
 async createPost(title, body, username){
     //Input Validation
    if(!title) throw 'Title must be supplied!';
    if(!body) throw 'Body must be supplied!';
    if(!username) throw 'Username must be supplied!';

    if(typeof(title) != 'string') throw 'Title must be a string!';
    if(typeof(body) != 'string') throw 'Body must be a string!';
    if(typeof(username) != 'string') throw 'Username must be a string!';
    
    title = title.trim();
    body = body.trim();
    username = username.trim();
    if(title.length == 0){
        throw 'Title must be nonempty!';
    }
    if(body.length == 0){
        throw 'Body must be nonempty!';
    }
    if(username.length < 4){
        throw 'Username must atleast 4 characters long!';
    }
    if(username.indexOf(' ') != -1){
        throw 'Username cannot contain spaces!';
    }
    if(username.match(/^[0-9A-Za-z]+$/) === null){
        throw 'Username must only use alphanumeric characters!';
    }
     //Query User Document 
    const usersCollection = await users();
    const user = await usersCollection.findOne({username: username});
    if(user === null){
        throw 'User with supplied username does not exist!';
    }
     //Create Post Object
    let post = {
        userId: user._id.toString(),
        title: title,
        body: body,
        comments: []
    };
     //Insert Post Into Forums Database
    const forumsCollection = await forums();
    const insertInfo = await forumsCollection.insertOne(post);
    if(insertInfo.insertedCount === 0){
        throw 'Could not add post!';
    }
     //Insert PostId Into User Database
     //Check if user has posts property, if not make it
    const postId = insertInfo.insertedId.toString();
    let posts = user.posts;
    if(posts){
        posts.push(postId);
    } else {
        posts = [postId];
    }

    usersCollection.updateOne(
        { username: username }, 
        { '$set': {posts: posts} }
    );

    return {postInserted: true, postId: postId};
 },
 async createComment(id, body, username){
    //Input Validation
   id = await this.checkId(id);
   if(!body) throw 'Body must be supplied!';
   if(!username) throw 'Username must be supplied!';

   if(typeof(body) != 'string') throw 'Body must be a string!';
   if(typeof(username) != 'string') throw 'Username must be a string!';

   body = body.trim();
   username = username.trim();
   if(body.length == 0){
       throw 'Body must be nonempty!';
   }
   if(username.length < 4){
       throw 'Username must atleast 4 characters long!';
   }
   if(username.indexOf(' ') != -1){
       throw 'Username cannot contain spaces!';
   }
   if(username.match(/^[0-9A-Za-z]+$/) === null){
       throw 'Username must only use alphanumeric characters!';
   }
    //Query Post and User Document 
   const usersCollection = await users();
   const user = await usersCollection.findOne({username: username});
   if(user === null){
       throw 'User with supplied username does not exist!';
   }
   const post = await this.get(id);
    //Create Comment Object
   date = new Date();
   let comment = {
       _id: ObjectId().toString(),
       userId: user._id.toString(),
       date: date,
       content: body
   };

   
    //Insert Comment Into Forums Database
    const forumsCollection = await forums();
    post.comments.push(comment);
    forumsCollection.updateOne(
       { _id: ObjectId(post._id) }, 
       { '$set': {comments: post.comments} }
   );
   let comments = await this.formatComments(post._id);
   return {commentInserted: true, comments: comments};
},

async formatComments(id){
    //Formats Comments to Be Displayed Properly On Website
    id = await this.checkId(id);
    let post = await this.get(id);
    let comments = post.comments;
    for(comment of comments){
        comment.username = await usersData.getUsername(comment.userId);
        comment.date = comment.date.toDateString();
        comment.content = md.render(comment.content);
    }
    return comments;
},
 async getAll(){
     //Make Database Query For All Posts
    const forumsCollection = await forums();
    let postList = await forumsCollection.find({}).toArray();
    if (!postList) throw 'Could not get all posts!'
    for(let post of postList){
        post._id = post._id.toString();
        post.username = await usersData.getUsername(post.userId.toString());
        //post.title = md.render(post.title);
        //post.body = md.render(post.body);
    }
    return postList;
 },
 async get(id){
     //Input Validation
    if(!id) throw 'Post ID  must be supplied!';
    if(typeof(id) != 'string') throw 'Post ID  must be a string!';   
    id = id.trim();
    if(id.length == 0){
        throw 'Post ID  must be nonempty!';
    }
    if(!ObjectId.isValid(id)) throw "Post ID must be a valid ObjectID!"
     //Make Database Query For Matching PostID
    const forumsCollection = await forums();
    const post = await forumsCollection.findOne({ _id: ObjectId(id) });
    if (post === null) throw `Could not find post with id of ${id}`;
    post._id = post._id.toString();
    return post;
 },
async checkId(id){
    if(!id) throw 'Post ID  must be supplied!';
    if(typeof(id) != 'string') throw 'Post ID  must be a string!';   
    id = id.trim();
    if(id.length == 0){
        throw 'Post ID  must be nonempty!';
    }
    if(!ObjectId.isValid(id)) throw "Post ID must be a valid ObjectID!"
    return id;
},
 async getAllUser(username){
     //Input Validation
    if(!username){
        throw 'Username must be supplied!';
    }
    if(typeof(username) != 'string'){
        throw 'Username must be a string!';
    }
    username = username.trim();
    if(username.length < 4){
        throw 'Username must atleast 4 characters long!';
    }
    if(username.indexOf(' ') != -1){
        throw 'Username cannot contain spaces!';
    }
    if(username.match(/^[0-9A-Za-z]+$/) === null){
        throw 'Username must only use alphanumeric characters!';
    }

    //Query For User 
    const usersCollection = await users();
    const user = await usersCollection.findOne({username: username});
    if(user === null){
        throw 'No user exists with the supplied username!';
    }
    let postIDs = []
    if(user.posts){
        postIDs = user.posts;
    }
    let posts = [];
    for(postID of postIDs){
        post = await this.get(postID);
        posts.push(post);
    }
    return posts;
 }

};

module.exports = exportedMethods;