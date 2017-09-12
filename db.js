// ADD THIS PART TO YOUR CODE
"use strict";

var Enumerable = require('./node_modules/linq');

var endpoint = "https://demianiot-docdb.documents.azure.com:443/";
var primaryKey = "AaYitd6nDmpgcBfVFd96U4PTdaLGorzziNfLtJwjrtjNgZuoabTCIskKO3eJ9tthxIX5PIMsMP2hEuteXcwZ0w==";
var collection = "NodeTutorial_Users";
var databaseId = "docdb-id";

var documentClient = require("documentdb").DocumentClient;
var url = require('url');

var client = new documentClient(endpoint, { "masterKey": primaryKey });

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${databaseId}`;
var collectionUrl = `${databaseUrl}/colls/${collection}`;

    /*createDatabase = function(req, res)
    {
        var dbid = req.body.tbDatabaseName;
        if (dbId == null || dbId == '')
            {
                dbId = this.databaseId;
            }

        client.createDatabase(`dbs/${dbId}`, (err, created) => {
            if (err) reject(err)
            else resolve(created);
        });
    };*/
     
    /*exports.getDatabase  = function(req, res, next) {
        var dbId = req.body.tbDatabaseName;
        if (dbId == null || dbId == '')
            {
                dbId = this.databaseId;
            }
        console.log(`Getting database:\n${dbId}\n`);

         res.send( client.readDatabase( `dbs/${dbId}`, (err, result) => {
            if (err) {                
               "{error in reading db}";                
            } else {
                JSON.stringify(result);
            }
        }));
    }*/

    function getDatabase(dbId) {
        if (dbId == null || dbId == '')
            {
                dbId = this.databaseId;
            }
        console.log(`Getting database:\n${dbId}\n`);

         return client.readDatabase( `dbs/${dbId}`, (err, result) => {
            if (err) {                
               false;                
            } else {
                true;
            }
        });
    }

    exports.getUserDocument1 =  function (req, res, next, mycallback) {
        var dbName = req.body.tbDocumentName;

        //getDatabase()

        let documentUrl = `${collectionUrl}/docs/${dbName}`;
        console.log(`Getting document:\n${dbName}\n`);

        var retVal;

         new Promise((resolve, reject) =>
         {
            client.readDocument(documentUrl, {  }, (err, result) => 
            {
                if (err) 
                {
                     reject(JSON.stringify(err));
                }
                else 
                {
                     console.log( "Found: " + JSON.stringify(result.user) );
                     resolve(JSON.stringify(result.user));
                }
            });
        }).then(value => mycallback(req, res, next, value))
        .catch(err => res.send(err));
    };
    
    exports.getUserDocument =  function (req, res, next) {
        var dbName = req.body.tbDocumentName;

        //getDatabase()

        let documentUrl = `${collectionUrl}/docs/${dbName}`;
        console.log(`Getting document:\n${dbName}\n`);

        return new Promise((resolve, reject) => {
            client.readDocument(documentUrl, {  }, (err, result) => {
                if (err) {
                     res.send(JSON.stringify(err));
                    }
                else {
                     res.send(JSON.stringify(result.user));
                }
            });
        });
    };

    exports.setUserDocument =  function (req, res, next) {
        var user = req.body;

        client.createDocument(collectionUrl, user, (err, created) => {
            if (err) res.status(400).send(err)
            else res.send(created);
        });
    };

    exports.getAllDocuments =  function (req, res, next) 
    {
        console.log(`Getting all documents from:\n${collectionUrl}\n`);

        return new Promise((resolve, reject) => 
        {
            var results = client.readDocuments(collectionUrl);

            results.toArray(function (err, resList)
            {
                if (err) res.status(400).send(err)
                else 
                {
                    console.log(`found ${resList.length} user records`);
                    res.json(Enumerable.from(resList).select((x,y) => x.user).toArray());
                }
            });
        });
    };

  /*   createCollection(collectionName)
    {
        if (collectionName == null || collectionName == '')
            {
                collectionName = this.collection;
            }

        client.createCollection(databaseUrl, collectionName, { offerThroughput: 400 }, (err, created) => {
            if (err) reject(err);
            else resolve(created);
        });
    } 

     getCollection(collectionName) {
        if (collectionName == null || collectionName == '')
            {
                collectionName = this.collection;
            }

        console.log(`Getting collection:\n${collectionName}\n`);

        return new Promise((resolve, reject) => {
            client.readCollection(collectionUrl, (err, result) => {
                if (err) {
                        reject(err);
                    }
                else {
                    resolve(result);
                }
            });
        });
    }

     createUserDocument(document)
    {
        client.createDocument(collectionUrl, document, (err, created) => {
            if (err) reject(err)
            else resolve(created);
        });
        
    }
    */
    
