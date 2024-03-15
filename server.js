// Import the dependency

const http = require('http');
const url = require('url');

// Server Class
class Server{
    constructor(){
        this._issues = [
            { id: 1, title: 'Donuts', description: 'Description of Issue 1' },
            { id: 2, title: 'Icecream', description: 'Description of Issue 1' },
            { id: 3, title: 'Pizza', description: 'Description of Issue 1' },
            { id: 4, title: 'Pingpong', description: 'Description of Issue 1' },
            { id: 5, title: 'Water', description: 'Description of Issue 1' }
        ]
        this._server = http.createServer(this.requestHandler.bind(this));
        this._port = process.env.PORT || 5000;

    }

    // Start listening to requests
    start(){

        this._server.listen(this._port,()=>{
            console.log(`Server running on port: ${this._port}`)
        })
    }

    // Request Handler
    requestHandler(req,res){
        const method = req.method;
        const urlObject = url.parse(req.url,true)
        const path = urlObject.pathname;
        console.log(method);

        if(method === "GET" && path === '/api/issues' ){
            this.getIssue(res);
        }else if(method === "POST"  && path === '/api/issues'){
            this.createIssue(req,res);
        }else if(method === "PUT"  && path === '/api/issues'){
            this.updateIssue(req,res);
        }else if(method === "DELETE"  && path === '/api/issues'){
            this.deleteIssue(req,res);
        }else{
            this.pathNotFound(res);
        }
    }

    // when a path is not found
    pathNotFound(res){
        res.statusCode = 404;
        res.end('Not found')
    }

    // Read Issue
    getIssue(res){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(this._issues));
    }

    // Create Issue
    createIssue(req,res){
        let body = "";
        req.on('data',(chunk) => {body += chunk.toString()})
        req.on('end', () => {
            const newIssue = JSON.parse(body);
            newIssue.id = this._issues.length + 1;
            this._issues.push(newIssue);
            console.log('New issue:', newIssue);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newIssue));
          });
    }
    // Update Issue

    updateIssue(req,res){
        let body = "";
        req.on('data',(chunk) => {body += chunk.toString()});
        req.on('end', () => {
            const updatedIssue = JSON.parse(body);
            const index = this._issues.findIndex((issue) => issue.id === updatedIssue.id);
            if (index !== -1) {
              this._issues[index] = updatedIssue;
              console.log('Issue updated:', updatedIssue);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(updatedIssue));
            } else {
              res.statusCode = 404;
              res.end('Issue not found');
            }
          });
    }


    // Delete Issue
    deleteIssue(req,res){
        const urlObject = url.parse(req.url, true);
        const issueId = parseInt(urlObject.query.id);
        const index = this._issues.findIndex((issue) => issue.id === issueId);
        if (index !== -1) {
          const deletedIssue = this._issues.splice(index, 1)[0];
          console.log('Issue deleted:', deletedIssue);
          res.statusCode = 200;
          res.end('Issue deleted');
        } else {
          res.statusCode = 404;
          res.end('Issue not found');
        }
    
    }

}

const server = new Server();
server.start();