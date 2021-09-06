const express = require ('express');
const cors = require ('cors');
const monk = require('monk');
const Filter = require('bad-words');
// const rateLimit=require("express-rate-limit");

const app = express();
const db = monk('localhost/meower');
const mews = db.get('mews');
// const Filter= new Filter();

// app.use(cors());
app.use(express.json());



app.get('/', function(request,response){
    response.json({
        message:'meower!'
    });
});

app.get('/mews',(req,res)=>{
    mews
    .find()
    .then(mews => {
        res.json(mews);
    });
})

function isValidMew(mew){
    return mew.name && mew.name.toString().trim() !=='' &&
     mew.content && mew.content.toString().trim() !=='';
}

// app.use(rateLimit({
//         windowsMs: 30 * 1000,
//         max: 1
//     })
// );
app.post('/mews', function(req, res){
    if (isValidMew(req.body)){
        // const mew ={
        //     name: Filter.clean(req.body.name.toString()),
        //     content:Filter.clean(req.body.content.toString()),
        //     created: new Date()
        // };

        const mew = req.body;
        mews
        .insert(mew)
        .then(function(createdMew){
            res.json(createdMew);
        })
    } else {
       res.status(422);
       res.json({
        message:'hey! name and content are required!'

       }); 
    }
});
app.listen(5000, function(){
    console.log('listening on http://localhost:5000');
});