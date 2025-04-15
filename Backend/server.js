const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { user, posts } = require('./data');

const app = express();
user
app.get('/', (req, res) => {
    res.send("Api is Working");
})


app.get('/users', (req, res) => {
    try {

        let userData;
        fetch('http://20.224.56.144/evaluation-service/users').then(res => res.json()).then(data => {
            userData = data;
        })
        let top5User;
        for (let i = 0; i < userData.length; i++) {
            if (i < 5) {
                top5User = userData[i];
            }
        }
        res.json({
            success: true,
            top5User
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            mass: "Not found"
        })
    }
})


app.get("/users/:userid/posts", (req, res) => {
    try {
        const id = req.params.userid;
        let posts;
        fetch('http://20.224.56.144/evaluation-service/users').then(res => res.json()).then(data => {
            posts = data;
        })
        const postsData = posts.filter(post => post.userId === id);
        res.json({
            success: true,
            postsData
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            mass: "Not found"
        })

    }
})


app.get('/posts/:postid/comments', (req, res) => {
    try {
        const id = req.params.postid;
        let comments;
        fetch(`http://20.224.56.144/evaluation-service/posts/${postId}/${comments}`).then(res =>
            res.json()).then(data => {
                comments = data;
            })
        const commentsData = comments.filter(comment => comment.postId === id);
        res.json({
            success: true,
            commentsData
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            mass: "Not found"
        })

    }
})



app.listen(3000, () => {
    console.log("server is running");
})
