import React, { useState, useEffect } from "react";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import articleContent from "./article-content";
import CommentsList from "./CommentsList";
import UpvotesSection from "./UpvotesSection";
import AddCommentForm from "./AddCommentForm";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    // without db dummy data use below commented line 13 only
    //setArticleInfo({ upvotes: Math.ceil(Math.random()*10) });

    //calling mongo based api's
    const fetchData=async()=>{
      const result = await fetch(`/api/articles/${name}`);
      console.log("result is" + result);
      const body = await result.json();
      console.log("body is" + JSON.stringify(body));
      setArticleInfo(body);
    }
    fetchData();
  },[name]);
  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1 id="header">{article.title}</h1>
      <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
      {article.content.map((paragraph, key) => (
        <p id="textColor" key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments}/>
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}>Add a Comment</AddCommentForm>
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
