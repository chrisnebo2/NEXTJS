import { comments } from "../../../comments/comments";

export default function handler(req, res) {
    if(req.method === 'GET') {
        res.status(200).json( comments )
    } else if(req.method === 'POST') {
        const text = req.body.comment
        const newComment = { id: Date.now(), text: text}
        comments.push(newComment)
        res.status(201).json(newComment)
    }
}
  