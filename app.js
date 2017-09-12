
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }));

var fs = require('fs');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

var db = require('./db');

app.get('/', function (req, res, next)
{
    fs.readFile('./index.html', null, function(error, data){
        if (error)
            res.status(404).Send('You\'re file was not found!');
        else
            {
                res.contentType('text/html').send(data);
            }
    }); 
});

//depricated ... no need for the ui anymore :-)
/*
app.get('', function (req, res) {
     res.send(GetPageDefinition());
   });

 app.get('/getalldocuments', function (req, res, next)
{
    db.getAllDocuments(req, res, next);
});
*/

/* app.post('/getdb',function (req, res, next)
{
    //var dbname = req.body.tbDatabaseName;
    // var retStr = `<H1>Hey, it worked! </H1>` + req.body.tbDatabaseName;

    //res.send(retStr);
    
    db.getDatabase(req, res, next);
}); */
app.post('/getdocument1', function (req, res, next)
{

    db.getUserDocument1(req, res, next, mycallback);
});

app.post('/getdocument',function (req, res, next)
{
    //var dbname = req.body.tbDatabaseName;
    // var retStr = `<H1>Hey, it worked! </H1>` + req.body.tbDatabaseName;

    //res.send(retStr);
    
    //UpdateUserList(db.getUserDocument(req, res, next));
   db.getUserDocument(req, res, next);
    
});

app.post('/setDocument', function (req, res, next)
{
    db.setUserDocument(req, res);
});


function mycallback(req, res, next, retVal) 
{
    res.send(retVal);
}

function UpdateUserList(users)
{
    //var userArray
    var userList = document.getElementById("userList");
    
    users.array.forEach(function(user) {
        document.createElement("li");
        li.appendChild(document.createTextNode(user.username));
        ul.appendChild(li);
    }, this);
}

module.exports = app;

function GetPageDefinition()
{
    var pageDefinition = 'Let\'s test out Cosmos db from node.js!!!';

    pageDefinition += '<br />';

    pageDefinition += '<form method="POST">';
    
    pageDefinition += `<label>DatabaseName: </label><input type="text" id='tbDatabaseName' name='tbDatabaseName' value="docdb-id"></input> <button formaction="/getdb" type="submit">Find it!</button>`;

    pageDefinition += `<label>DocumentId: </label><input type="text" id='tbDocumentName' name='tbDocumentName' value="1"></input> <button formaction="/getdocument" type="submit">Find it!</button>`;

    pageDefinition += '</form>';

    pageDefinition += '<div visible="false" name="userDiv" id="userDiv">List Of Users: </br> <ul id="userList" name="userList"></ul>';

    return pageDefinition;
}

