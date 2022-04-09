const bodyParser = require('body-parser');
var express = require('express');
// var express = require('axios');
var fs = require('fs');

// express 설정
var app = express();
app.use(express.static(__dirname + '/'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// index
app.get('/', (req, res) => {
    res.render('index', { title: 'index' });
})

// load

app.get('/load', (req, res) => {
    fs.readFile('post.json', 'utf-8', (err, data) => {
        let parsed = JSON.parse(data);
        res.json(parsed);
    });
})

// del

app.get('/del', (req, res) => {
    fs.writeFile('post.json', "[]", 'utf-8', (err) => { 
        let R = err ? err : "delete succeeded.";
        console.log(R);
        res.json({"result": R})
    });
})


// save
app.post('/posting', function (req, res) {
    console.log(req.body);
    res.send({"result":"/posting 호출 완료.", "data" : req.body});
    fs.readFile('post.json', 'utf-8', (err, data) => {
        let parsed = JSON.parse(data);
        parsed.push(req.body);
        fs.writeFile('post.json', JSON.stringify(parsed), 'utf-8', (err) => { 
            console.log(err ? err : "write succeeded.");
        });
    });

    // fs.appendFile('post.txt', JSON.stringify(req.body) + ',\n', function (err) {
    //     if (err) throw err;
    //     console.log('The "data to append" was appended to file!');
    // });
});

app.listen(8080, () => {
    console.log('Connected 8080 port!');
});

for(let i = 0; i < 7; i++){
    app.get('/nav'+ i, (req, res) => {
            res.json("OK");
        });
}