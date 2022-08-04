import './Avatar.css'
import NoAvatar from '../assets/no-avatar.jpg'

export default function Avatar({ src }) {
  if(src.includes('noavatar')){
    src = NoAvatar
  }
  return (
    <div className='avatar'>
        <img src={src} alt='user avatar' />
    </div>
  );
}
