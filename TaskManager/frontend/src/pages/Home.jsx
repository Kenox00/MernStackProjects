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
import { useEffect } from "react"


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkOutsContext } from "../hooks/useWorkOutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
  const { workouts, dispatch } = useWorkOutsContext()
  const { user } = useAuthContext()

  /**
   * This effect fetches the workouts from the database
   * and updates the state of the component with the
   * fetched data.
   */
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/workouts',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if (user) {
    fetchWorkouts();
  }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {/* Render the list of workouts if the state is not null */}
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      {/* Render the WorkoutForm component */}
      <WorkoutForm />
    </div>
  )
}

export default Home
