const express = require('express');
const app = express();
const PORT = 8080;
const apiGen = require('./api');

app.listen(
    PORT,
    () => console.log("Api is live")
)

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views');
app.set('view engine','ejs')



app.get('', (req,res) => {
    res.render('index')
})

app.get('/documentation', (req,res) => {
    res.render('documentation')
})







app.get('/newTopoPfp/:seed?/:background?/:accent?', (req,res) =>{
    res.setHeader('Content-Type', 'image/png');
    apiGen.newPfp(req.params,req.originalUrl).pngStream().pipe(res);
});

// app.get('/newGridPfp/:seed?/:background?/:accent?', (req,res) =>{
//     res.setHeader('Content-Type', 'image/png');
//     apiGen.newGridPfp(req.params).pngStream().pipe(res);
// });

app.get('/newFieldPfp/:seed?/:background?/:accent?', (req,res) =>{
    res.setHeader('Content-Type', 'image/png');
    apiGen.newPfp(req.params,req.originalUrl).pngStream().pipe(res);
});




app.get('*', function(req, res){
    res.status(404);
    res.render('404')
});
