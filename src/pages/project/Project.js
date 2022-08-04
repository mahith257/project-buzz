import './Project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

export default function Project() {

  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if(error){
    return <div className='error'>{error}</div>
  }

  if(!document){
    return <div className='loading'>Loading ....</div>
  }

  return (
    <>
    <h2 className='page-title' style={{marginBottom:'20px'}}>Project Details</h2>
    <div className='project'>
        <ProjectSummary project = {document} />
        <ProjectComments project = {document} />
    </div>
    </>
  );
}
