const CommentsList = ({ comments }) => (
    <>
        <h3>Comments:</h3>
        {comments && comments.map((comment) => (
            <div className="comment" key={comment.postedBy + ': ' + comment.text}>
                {comment.email ? <h4>{comment.email}</h4> :<h4>{comment.postedBy}</h4> }
                <p>{comment.text}</p>
            </div>
        ))}
    </>
);

export default CommentsList;