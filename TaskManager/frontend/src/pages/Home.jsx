/**
 * This component renders the home page of the application.
 * It fetches the workouts from the database using the
 * useWorkOutsContext hook and displays them in a list.
 * It also renders the WorkoutForm component to allow
 * the user to add new workouts.
 *
 * @returns {JSX.Element} The JSX element representing
 * the home page of the application.
 */
import { useEffect, useState } from "react"
import axios from "axios"


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkOutsContext } from "../hooks/useWorkOutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
  const { workouts, dispatch } = useWorkOutsContext()
  const { user } = useAuthContext()
  const [error, setError] = useState(null)

  /**
   * This effect fetches the workouts from the database
   * and updates the state of the component with the
   * fetched data.
   */
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        dispatch({type: 'SET_WORKOUTS', payload: response.data})
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch workouts')
      }
    }
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])
  return (
    <div className="home">
      <div className="workouts">
        {/* Render the list of workouts if the state is not null */}
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
        {/* Display an error message if there is an error */}
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
      {/* Render the WorkoutForm component */}
      <WorkoutForm />
    </div>
  )
}

export default Home

