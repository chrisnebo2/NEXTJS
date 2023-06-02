
function CommentDetails({comment}) {
  return (
    <div>
        <h3>{comment.id} {comment.text}</h3>
    </div>
  )
}

export default CommentDetails;

export async function getStaticPaths(context) {
    console.log(context);
    return [
        {
            params: {commentId: 1}
        }
    ]
}
