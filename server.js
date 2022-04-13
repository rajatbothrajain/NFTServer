const Joi = require('joi');
const express = require('express');
const app = express();
const sdk = require('api')('@opensea/v1.0#1j3wv35kyd6wqwc');

//Import middle layer json
app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},

];

app.get('/', (req, res)=>{
    res.send("Hello World");
});




//WalletAddress: 0x1C2DB58d008854e2a77611829c9E7c04De2B411e
app.get('/api/getNFT/:id', (request, response)=>{
    
    var output;

    sdk['retrieving-assets-rinkeby']({

        owner: request.params.id,
      
        order_direction: 'desc',
      
        offset: '0',
      
        limit: '20'
      
      })
        .then(res => response.send(res))
        .catch(err => response.send(err));

    //const course = courses.find(c => c.id == parseInt(req.params.id));
    //if(!course) res.status(404).send("The course with given id was not found...");
    ///console.log("Output:", res);
    //response.send(res);
});

app.get('/api/courses/:year/:month', (req, res)=>{
    res.send(req.params);
});

app.get('/api/post/', (req, res)=>{
    res.send(req.query);
});

app.get('/api/post/', (req, res)=>{
    
    res.send(req.query);
});

app.post('/api/courses', (req, res)=>{

   
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){

        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);

});


//Environment Variable : PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('Listening on port ${port}...'));


//app.post()
//app.put()
//app.delete()


