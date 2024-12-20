import  { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'



export const useWorkOutsContext = () => {
    const context = useContext(WorkoutsContext)

   if(!context) {
    throw Error('useWorkOutContext must be used inside an WorkOutContextProvider') 
   }

  return context
}
