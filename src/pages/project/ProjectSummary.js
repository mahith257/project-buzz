import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom'

export default function ProjectSummary({ project }) {

    const { user } = useAuthContext()
    const { deleteDocument } = useFirestore('projects')
    const history = useHistory()

    const handleClick = () => {
        deleteDocument(project.id)
        history.push('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className='due-date'>Created by {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project is due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="project-details">
                    {project.details}
                </p>
                <h4>Assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id} className='single-avatar'>
                            <Avatar src = {user.photoURL} />
                            <span className='tooltip'>{user.displayName}</span>
                        </div>
                    ))}
                </div>
            </div>
            {(user.uid === project.createdBy.id) && (
                <button className="btn" onClick={handleClick}>Project Completed / Delete</button>
            )}
        </div>
    );
}
