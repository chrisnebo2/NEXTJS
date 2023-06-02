import { useState } from "react";

function Comments() {
    const [comments, setComments] = useState([])
    const [update, setUpdate] = useState(false)
    const [comment, setComment] = useState('')
    const [commentIdToUpdate, setCommentIdToUpdate] = useState(null)

    const fetchComments = async () => {
        const response = await fetch('/api/comments')
        const data = await response.json()

        setComments(data)
    }

    const submitComment = async () => {
        if(!comment) {
            console.error('Comment must contain something');
            return
        }
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setComment('')
        fetchComments()
    }

    const deleteComment = async (id) => {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()

        console.log(data)
        setComment('')
        fetchComments()
    }

    const updateComment = (id, currentComment) => {
        setComment(currentComment)
        setUpdate(true)
        setCommentIdToUpdate(id)
    }
    
    const sendUpdate = async (id, updatedComment) => {
        if(!comment) {
            console.error('Comment must contain something');
            return
        }
        const response = await fetch(`/api/comments/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({id: id, text: updatedComment}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        setComment('')
        fetchComments()
        setUpdate(false)
    }

  return (
    <>
        <input type="text" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        {
            update ? 
            <button onClick={() => sendUpdate(commentIdToUpdate, comment)}>Update Comment</button> :
            <button onClick={submitComment}>Submit Comment</button>
        }
        <button onClick={fetchComments}>Load Comments</button>
        {
            comments.map((comment, index) => (
                <div key={comment.id}>
                    <h3 >{index + 1} {comment.text} &nbsp;
                    <span>
                    <button onClick={() => deleteComment(comment.id)}>Delete</button> 
                    <button onClick={() => updateComment(comment.id, comment.text)}>Update</button>
                    </span>
                    </h3>
                </div>
            ))
        }
    </>
  )
}

export default Comments;
