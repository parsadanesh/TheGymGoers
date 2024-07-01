import axios from "axios";
import { useEffect, useState } from "react";
import ViewCardioTraining from "../components/viewCardioTraining";
import ViewWeightTraining from "../components/ViewWeightTraining";

const ViewWorkout = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [display, setDisplay] = useState([]);

    





    const getWorkouts = async (e) => {
        try {
            const res = await axios.get("http://localhost:3000/viewWorkouts", { params: props.user });            
            setWorkouts(res.data);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    const reformatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        

        return formattedDate;
    }
        
    const createViewWorkout = () => {
        const tempDisplay = [];
        workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                if (exercise.name !== "Cardio") {
                    tempDisplay.push(<ViewWeightTraining date={reformatDate(workout.dateCreated)} name={exercise.name} reps={exercise.reps} sets={exercise.sets} weight={exercise.weight} />)
                } else {
                    tempDisplay.push(<ViewCardioTraining name={exercise.name} duration={exercise.duration} date={reformatDate(workout.dateCreated)} />)
                }
            });
        });
        setDisplay(tempDisplay);
    };



    useEffect(() => {
        getWorkouts();
    });

    useEffect(() => {
        
        if (workouts.length > 0) {
            createViewWorkout();
            name = workouts[0].exercises[0].name;
        }
        // console.log(display.length);
    }, [workouts]);

    return (
        <div>
            <h1>Hello</h1>
            {display.length > 0 && (
                <div>{ display }</div>

            )}
            {/* <ul class="list-group">
                <li class="list-group-item">{workouts[0].name}</li>
            </ul> */}
            
        </div>
    );

}

export default ViewWorkout;