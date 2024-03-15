import React, {useState,useEffect} from 'react';

const BASE_URL = "http://localhost:5000/"


function IssueTracker (){
    const [issues,setIssues] = useState([]);


    async function fetchIssues(){
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setIssues(data);
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function createIssue(){
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setIssues(data);
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function updateIssue(){
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setIssues(data);
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function deleteIssue(){
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setIssues(data);
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }
    


    return(
    <div>
        <h1>Sitemate Issue Tracker</h1>

        <div>
            <h2>Get Issues</h2>
            <button onClick={fetchIssues}>Get Issues</button>
        </div>
        <div>
            <h2>Create Issue</h2>
            <input type="text" placeholder='Title'></input>
            <input type="text" placeholder='Description'></input>
            <button onClick={createIssue}>Create Issue</button>


        </div>
        <div>
            <h2>Update Issue</h2>
            <input type="text" placeholder='Issue ID'></input>
            <input type="text" placeholder='Title'></input>
            <input type="text" placeholder='Description'></input>
            <button onClick={updateIssue}>Update Issue</button>
        </div>
        <div>
            <h2>Delete Issues</h2>
            <input type="text" placeholder='Issue ID'></input>
            <button onClick={deleteIssue}>Delete Issue</button>
        </div>
            

    </div>)
}


export default IssueTracker;