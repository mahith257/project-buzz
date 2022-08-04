import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project }) {

    const [newComment, setNewComment] = useState('')
    const {user} = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = (e) => {
        e.preventDefault()

        const commentObj = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        updateDocument(project.id, {
            comments: [...project.comments, commentObj]
        })

        if(!response.error){
            setNewComment('')
        }
    }
    return (
        <div className="project-comments">
            <h4>Comments</h4>
            {project.comments.length > 0 && (
                <ul>
                    {project.comments.map(comment => (
                        <li key={comment.id}>
                            <div className="comment-author">
                                <Avatar src={comment.photoURL} />
                                <p>{comment.displayName}</p>
                            </div>
                            <div className="comment-date">
                                <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                            </div>
                            <div className="comment-content">
                                <p>{comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <form className="comments" onSubmit={handleSubmit}>
                <label>
                    <span>Add New Comment:</span>
                    <textarea 
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value = {newComment}
                    />
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    );
}
