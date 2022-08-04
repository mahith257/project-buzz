import './ProjectList.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar';


export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
        {projects.length === 0 && <p>No projects yet</p>}
        {projects.map(project => (
            <Link key={project.id} to = {`project/${project.id}`}>
                <h4>{project.name}</h4>
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
                <div className='assigned-to'>
                    <ul>
                        {project.assignedUsersList.map(user => (
                            <li key={user.id} className='dashboard-avatar'>
                                <Avatar src = {user.photoURL} />
                                {/* <span className='tooltip'>{user.displayName}</span> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        ))}
    </div>
  );
}
