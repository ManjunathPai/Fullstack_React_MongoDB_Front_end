import React from "react";

const UpvotesSection = ({articleName,upvotes,setArticleInfo}) => {
    const upvoteArticle=async() =>{ 
        const result=await fetch(`/api/articles/${articleName}/upvotesmongo`,{
        method:'post',
    });
    //console.log("result is "+JSON.stringify(await result.json()));
    const body=await result.json();
    setArticleInfo(body);
}
  return <div id="upvote-section">
      <button onClick={()=>upvoteArticle()}>Add Upvote</button>
      <p id="textColor">This post has been upvoted {upvotes} times.</p>
  </div>;
};


export default UpvotesSection;