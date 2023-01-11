import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDb } from './db.js';


const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
// Above: Firebase admin requirements


const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});
//Above: Firebase admin - Load user info automatically from auth token

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
            // const upvoteIds : every article will have an associated array of uid's of users who have upvoted it. this allows for endpoint protection (no user can upvote twice, etc)
                // "... article.upvoteIds || [] " : defaults to an empty array if there haven't been any upvotes for the article yet (crash prevention)
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    if (req.user){
        next();
    } else {
        res.sendStatus(401);
    }
});

//Above: Middleware that doublechecks whether the current user is authorized before performing actions at the next two endpoints (upvote, comment). Else, sends status 401 (user not authorized)

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = article.canUpvote = uid && !upvoteIds.includes(uid);
        
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid}
            });
        }
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.send('That article doesn\'t exist');
    }

});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { email, text } },
    });
    
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})