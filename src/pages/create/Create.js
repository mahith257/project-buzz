import './Create.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';

import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

const categories = [
    { value: 'Development', label: 'Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
]

export default function Create() {

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const [users, setUsers] = useState([])

    const { documents } = useCollection('users')
    const {user} = useAuthContext()
    const {addDocument, response} = useFirestore('projects')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if(!category){
            setFormError("Please select a category")
            return
        }
        if(assignedUsers.length < 1){
            setFormError("Please assign the project to atleast one user")
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map(user => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        const project = {
            name,
            details,
            category,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        // console.log(project)
        await addDocument(project)

        if(!response.error){
            history.push('/')
        }
    }

    useEffect(() => {
        if(documents){
            setUsers(documents.map(user => {
                return {value: user, label: user.displayName}
            }))
        }
    }, [documents])

    return (
        <div className='create-form'>
            <h2>Add a New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input 
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value = {name}
                        required
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea 
                        onChange={(e) => setDetails(e.target.value)}
                        value = {details}
                        required
                    />
                </label>
                <label>
                    <span>Project Due Date:</span>
                    <input 
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value = {dueDate}
                        required
                    />
                </label>
                <label>
                    <span>Project Category:</span>
                    <Select 
                        options = {categories}
                        onChange = {(option) => setCategory(option.value)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select 
                        options={users}
                        onChange = {(option) => setAssignedUsers(option)}
                        isMulti
                        className='users-select'
                    />
                </label>
                <button className='btn'>Add Project</button>
                {formError && <div className='error'>{formError}</div>}
            </form>
        </div>
    );
}
