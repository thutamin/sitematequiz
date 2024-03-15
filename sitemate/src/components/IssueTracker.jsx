import React, {useState,useEffect} from 'react';

const BASE_URL = "http://localhost:5000/api/issues"


function IssueTracker (){
    const [issues,setIssues] = useState([]);


    async function fetchIssues(){
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
            setIssues(data);
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function createIssue(){
        try {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:""
            }
            const response = await fetch(BASE_URL,options);
            const data = await response.json();
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function updateIssue(){
        try {
            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body:""
            }
            const response = await fetch(BASE_URL);
            const data = await response.json();
           
            
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }

    async function deleteIssue(){
        try {
            const options = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body:""
            }
            const response = await fetch(BASE_URL,options);
            const data = await response.json();
          } catch (error) {
            console.log('Error retrieving issues:', error.message);
          }
    }
    useEffect(() => {
        fetchIssues();
    },[])


    return(
    <div>
        <h1>Sitemate Issue Tracker</h1>

        <div>
            <h2>Get Issues</h2>
            <div>
                <ul>
                {issues.map((issue) => (
                <li key={issue.id}>
                    <strong>{issue.title}</strong> - {issue.description}
                </li>
                ))}
                </ul>
            </div>
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