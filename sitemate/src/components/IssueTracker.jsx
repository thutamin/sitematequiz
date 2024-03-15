import React, {useState,useEffect} from 'react';

const BASE_URL = "http://localhost:5000/api/issues"


function IssueTracker (){
    const [issues,setIssues] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [deleteId, setDeleteId] = useState('');



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
                body: JSON.stringify({ title, description }),
            }
            const response = await fetch(BASE_URL,options);
            const data = await response.json();
            setIssues([...issues, data]);
            setTitle('');
            setDescription('');
          } catch (error) {
            console.log('Error creating issues:', error.message);
          }
    }

    async function updateIssue(){
        try {
            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: parseInt(updateId),
                    title: updateTitle,
                    description: updateDescription,
                  }),
            }
            const response = await fetch(BASE_URL,options);
            const data = await response.json();
            const updatedIssues = issues.map((issue) =>issue.id === data.id ? data : issue);
            setIssues(updatedIssues);
            setUpdateId('');
            setUpdateTitle('');
            setUpdateDescription('');
            
          } catch (error) {
            console.log('Error updating issues:', error.message);
          }
    }

    async function deleteIssue(){
        try {
            const options = {
                method: 'DELETE',
            }
            const updatedIssues = issues.filter((issue) => issue.id !== parseInt(deleteId));
            setIssues(updatedIssues);
            setDeleteId('');
          } catch (error) {
            console.log('Error deleting issues:', error.message);
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
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button onClick={createIssue}>Create Issue</button>


        </div>
        <div>
            <h2>Update Issue</h2>
            <input type="text" placeholder='Issue ID' value={updateId} onChange={(e) => setUpdateId(e.target.value)}></input>
            <input type="text" placeholder='Title' value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)}></input>
            <input type="text" placeholder='Description' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)}></input>
            <button onClick={updateIssue}>Update Issue</button>
        </div>
        <div>
            <h2>Delete Issues</h2>
            <input type="text" placeholder='Issue ID' value={deleteId} onChange={(e) => setDeleteId(e.target.value)}></input>
            <button onClick={deleteIssue}>Delete Issue</button>
        </div>
            

    </div>)
}


export default IssueTracker;