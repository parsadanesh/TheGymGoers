import axios from "axios";
import { useEffect, useState } from "react";
// import ViewCardioTraining from "../components/ViewCardioTraining";
import ViewWeightTraining from "../components/ViewWeightTraining";

const ViewWorkout = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [display, setDisplay] = useState([]);
    


    const getWorkouts = async (e) => {
        try {
            // console.log(props.user);
            const res = await axios.get("http://localhost:3000/viewWorkouts", { params: props.user });     
            // console.log(res);
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

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Step 2: Filter Workouts by Date
        const recentWorkouts = workouts.filter(workout => {
            const workoutDate = new Date(workout.dateCreated);
            return workoutDate >= sevenDaysAgo;
        });

        // Group workouts by date
        const groupedByDate = recentWorkouts.reduce((acc, workout) => {
            const dateKey = reformatDate(workout.dateCreated);
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(workout);
            return acc;
        }, {});

        // Sort dates and create display elements
        const tempDisplay = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b)).map(date => (
            <div key={date} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h2>{date}</h2>
                {groupedByDate[date].map(workout => workout.exercises.map(exercise => {
                    if (exercise.name !== "Cardio") {
                        return <ViewWeightTraining key={exercise._id} date={date} name={exercise.name} reps={exercise.reps} sets={exercise.sets} weight={exercise.weight} />;
                    } else {
                        return <ViewCardioTraining key={exercise._id} name={exercise.name} duration={exercise.duration} date={date} />;
                    }
                }))}
            </div>
        ));
        setDisplay(tempDisplay);
    }

    useEffect(() => {
        getWorkouts();
    }, []);

    useEffect(() => {
        if (workouts.length > 0) {
            createViewWorkout();
        }
    }, [workouts]);

    return (
        <div>
            <h1>Hello, here you can see your last 7 days of workouts</h1>
            {display.length > 0 && (
                <div>{ display }</div>

            )}
            
        </div>
    );

}

export default ViewWorkout;