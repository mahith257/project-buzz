import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import NoAvatar from '../assets/no-avatar.jpg'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // creating upload path to upload the profile image there
      let uploadPath
      if(thumbnail !== NoAvatar){
        uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      }else{
        uploadPath = `thumbnails/${res.user.uid}/noavatar`
      }
      
      // uploading the image
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      // get download URL for the uploaded profile image
      const imgURL = await img.ref.getDownloadURL()

      // add display name and download URL as photoURL of the user
      await res.user.updateProfile({ displayName, photoURL: imgURL })

      // create user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        photoURL: imgURL
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}