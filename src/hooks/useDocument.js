import { useState, useEffect } from 'react'
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot((snapshot) => {
            if(snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            }else{
                setError('There is no such document')
            }
            
        }, (err) => {
            console.log(err.message)
            setError("Failed to get document data from firebase")
        })

        return () => unsub()
    }, [collection, id])

    return {document, error}
}