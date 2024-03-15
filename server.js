// Import the dependency

const http = require('http');
const url = require('url');


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

        if(method === "GET"){
            this.getIssue();
        }else if(method === "POST"){
            this.createIssue();
        }else if(method === "PUT"){
            this.updateIssue();
        }else if(method === "DELETE"){
            this.deleteIssue();
        }else{
            this.pathNotFound(res);
        }
    }

    // when a path is not found
    pathNotFound(res){
        res.satatusCode = 404;
        res.end('Not found')
    }

    // Read Issue
    getIssue(){
        console.log("Getting Issue")
    }

    // Create Issue
    createIssue(){
        console.log("Creating Issue")
    }
    // Update Issue

    updateIssue(){
        console.log("Updating Issue")
    }
    // Delete Issue
    deleteIssue(){
        console.log("Deleting Issue")
    }

}

const server = new Server();
server.start();