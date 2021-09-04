const express = require ('express');  1.1M(gzipped: 378.7k)
const cors = require ('cors'); 4.8k (gripped:2k)
const monk = require('monk');

const app = express();
const db = monk ('localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());

app.get('/', function(req,res){
    res.json({
        message:'meower!'

    });
});
app.get('/mews',(req,res)=>{
    mews
    .find();
    .then(mews => {
        res.json(mews);
    }
})

function isValidMew(mew){
    return mew.name && mew.name.toString().trim() !=='' &&
     mew.content && mew.content.toString().trim() !=='';
}
app.post('/mews', function(req, res){
    if (isValidMew(req.body)){
        const mew ={
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        mews
        .insert(mew)
        .then function(createdMew){
            res.json(createdMew);
        }

    }else{
       res.status(422);
       res.json({
        message:'hey! name and content are required!'

       }); 
    }
});
app.listen(5000, function(){
    console.log('listening on http://localhost:5000');


});