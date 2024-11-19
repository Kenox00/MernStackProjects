import React from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'
import Delete from '../assets/images/delete.png'


//  dates 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({workout}) => {
  const {dispatch} = React.useContext(WorkoutsContext);
  const {user} = useAuthContext(WorkoutsContext);
  const handleclick = async () => {

    if(!user){
      return
    }


     const response = await fetch(`http://localhost:5000/api/workouts/${workout._id}`, {
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
     })
    
     const json = await response.json()
   if(response.ok){
     dispatch({type: 'DELETE_WORKOUT', payload: json})
   }
  }
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps : </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className='delete' onClick={handleclick}>{<img src={Delete} alt="delete" />} </span>
    </div>

  )
}

export default WorkoutDetails