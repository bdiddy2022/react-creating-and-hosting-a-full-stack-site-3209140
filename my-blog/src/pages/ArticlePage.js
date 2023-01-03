import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import articles from './article-content';
import CommentsList from '../components/CommentsList';


const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    useEffect ( () => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            setArticleInfo(response.data);
        }

        loadArticleInfo();

    }, []);
    // useEffect requires an array as the second argument. The useEffect hook will call the first argument (the callback function) whenever the variables within the array update. If not watching for any updated components, simply pass in an empty array to prevent an infinite loop of the callback function 
    
    const article = articles.find(article => article.name === articleId);
    
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
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;