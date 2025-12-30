import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

const CreateIssue = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Status Rule: Open → Done not allowed
    if (status === "Done") {
      alert("You cannot create an issue directly with Done status!");
      return;
    }

    // Similar issue check
    const q = query(collection(db, "issues"), where("title", "==", title));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert("Similar issue already exists!");
      return;
    }

    // Add issue to Firestore
    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy: user.email,
      createdAt: serverTimestamp(),
    });

    alert("Issue created successfully!");
    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
    setAssignedTo("");
  };

  return (
    <div>
      <h2>Create Issue</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <input
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
};

export default CreateIssue;
