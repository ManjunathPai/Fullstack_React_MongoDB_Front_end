import React, { useState } from "react";

const AddCommentForm = ({articleName,setArticleInfo}) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

    const updateCommentOnClick= async ()=>{
        const response = await fetch(`/api/articles/${articleName}/add-comments-withmongodb`,{
            method:'post',
            body:JSON.stringify({username,text:commentText}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const body=await response.json();
        setArticleInfo(body);
        setUsername('');
        setCommentText('');
    }
  return (
    <div id="add-comment-form">
      <h3 id="textColor">Add a Comment</h3>
      <label id="textColor">
        Name:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label id="textColor">
        Comment:
        <textarea rows="4" cols="50" 
        value={commentText} onChange={(event)=>setCommentText(event.target.value)}/>
      </label>
      <button onClick={()=>updateCommentOnClick()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
