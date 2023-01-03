import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import articles from './article-content';

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    useEffect (() => {
        setArticleInfo({ upvotes: Math.ceil(Math.random() * 10), comments: [] });
    }, [articleId]);
    // useEffect requires an array as the second argument. The useEffect hook will call the first argument (the callback function) whenever the variables within the array update. If not watching for any updated components, simply pass in an empty array to prevent an infinite loop of the callback function 

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has { articleInfo.upvotes } upvote(s)</p>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </>
    );
}

export default ArticlePage;