import './AllUsers.css'

import {useCollection} from '../hooks/useCollection'
import Avatar from './Avatar';

export default function AllUsers() {

    const {documents, error} = useCollection('users')

    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div className='user-list-item' key={user.id}>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    );
}
