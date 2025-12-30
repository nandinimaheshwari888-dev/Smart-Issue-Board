import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIssues(data);
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <h2>All Issues</h2>
      {issues.map(issue => (
        <div key={issue.id} style={{border: "1px solid black", margin: "10px", padding: "10px"}}>
          <p><b>Title:</b> {issue.title}</p>
          <p><b>Description:</b> {issue.description}</p>
          <p><b>Priority:</b> {issue.priority}</p>
          <p><b>Status:</b> {issue.status}</p>
          <p><b>Assigned To:</b> {issue.assignedTo}</p>
          <p><b>Created By:</b> {issue.createdBy}</p>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
