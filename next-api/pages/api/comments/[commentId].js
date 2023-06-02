// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { comments } from "../../../comments/comments"

export default function handler(req, res) {
    const id = parseInt(req.query.commentId)

    if(req.method === 'GET'){
        const comment = comments.find(comment => comment.id === id)
        res.status(200).json(comment)
    } else if(req.method === 'DELETE') {
        const deletedCommentIndex = comments.findIndex(comment => comment.id === id)
        comments.splice(deletedCommentIndex, 1)
        res.status(200).json('')
    } else if(req.method === 'PATCH') {
        const { id, text } = req.body
        const commentToUpdate = comments.find(comment => comment.id === id)
        if(!commentToUpdate) {
            res.status(405).json('Comment could not be deleted')
        }
        commentToUpdate.text = text
        res.status(200).json('')
        console.log(id, "-", text);
    }
        
  }
  