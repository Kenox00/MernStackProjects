import React from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'
import Delete from '../assets/images/delete.png'
import axios from 'axios'


//  dates 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({workout}) => {
  const {dispatch} = React.useContext(WorkoutsContext);
  const {user} = useAuthContext();

  const handleclick = async () => {

    if(!user){
      return
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/workouts/${workout._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: response.data });
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
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
