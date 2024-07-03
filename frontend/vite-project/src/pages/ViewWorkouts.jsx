import axios from "axios";
import { useEffect, useState } from "react";
import ViewCardioTraining from "../components/ViewCardioTraining";
import ViewWeightTraining from "../components/ViewWeightTraining";

const ViewWorkout = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [display, setDisplay] = useState([]);
    const [consecutiveDays, setConsecutiveDays] = useState(0);
    


    const getWorkouts = async (e) => {
        try {
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

    // const calculateDateRange = () => {
    //     const sevenDaysAgo = new Date();
    //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    //     return sevenDaysAgo;
    // }


    // const filterWorkouts = (workouts, startDate) => {
    //     return workouts.filter(workout => {
    //         const workoutDate = new Date(workout.dateCreated);
    //         return workoutDate >= startDate;
    //     })
    // }

    // const groupWorkoutsByDate = () => {
    //     return workouts.reduce((acc, workout) => {
    //         const dateKey = reformatDate(workout.dateCreated);
    //         if (!acc[dateKey]) {
    //             acc[dateKey] = [];
    //         }
    //         acc[dateKey].push(workout);
    //         return acc;
    //     })
    // }


    // const renderExercise = (exercise, date) => {
    //     if (exercise.name !== "Cardio") {
    //         return <ViewWeightTraining key={exercise._id} date={date} name={exercise.name} reps={exercise.reps} sets={exercise.sets} weight={exercise.weight} />;
    //     } else {
    //         return <ViewCardioTraining key={exercise._id} name={exercise.name} duration={exercise.duration} date={date} />;
    //     }
    // };


    // const createWorkoutDisplay = (groupedByDate) => {
    //     return Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b)).map(date => (
    //         <div key={date} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    //             <h2>{date}</h2>
    //             {groupedByDate[date].map(workout => workout.exercises.map(exercise => renderExercise(exercise, date)))}
    //         </div>
    //     ));
    // };

    // const createViewWorkouts = () => {
    //     const startDate = calculateDateRange();
    //     const recentWorkouts = filterRecentWorkouts(workouts, startDate);
    //     const groupedByDate = groupWorkoutsByDate(recentWorkouts);
    //     const tempDisplay = createWorkoutDisplay(groupedByDate);
    //     setDisplay(tempDisplay);
    // };

    const createViewWorkout = () => {
        // create the date range
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // filter Workouts by Date
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
            <div className="d-flex flex-column align-items-center" key={date} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h2>{date}</h2>
                {groupedByDate[date].map(workout => workout.exercises.map(exercise => {
                    if (exercise.name !== "Cardio") {
                        return <ViewWeightTraining key={exercise._id}  name={exercise.name} reps={exercise.reps} sets={exercise.sets} weight={exercise.weight} />;
                    } else {
                        return <ViewCardioTraining key={exercise._id} name={exercise.name} duration={exercise.duration}/>;
                    }
                }))}
            </div>
        ));
        setDisplay(tempDisplay);
        setConsecutiveDays(calculateConsecutiveDays());
        
    }


    const calculateConsecutiveDays = () => {
        const uniqueDates = [...new Set(workouts.map(workout => {
            const date = new Date(workout.dateCreated);
            return date.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"
        }))].sort();

        let maxStreak = 0;
        let currentStreak = 1; // Start at 1 to account for the first day

        for (let i = 1; i < uniqueDates.length; i++) {
            const currentDate = new Date(uniqueDates[i]);
            const previousDate = new Date(uniqueDates[i - 1]);
            const diffInDays = (currentDate - previousDate) / (1000 * 3600 * 24);

            if (diffInDays === 1) {
                currentStreak++;
            } else {
                maxStreak = Math.max(maxStreak, currentStreak);
                currentStreak = 1; // Reset streak
            }
        }

        // Check the last streak
        maxStreak = Math.max(maxStreak, currentStreak);

        return maxStreak;
    };


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
            <h2>Hello, here you can see your last 7 days of workouts</h2>
            <h3>Number of Consecutive Day: {consecutiveDays}</h3>
            
            {display.length > 0 && (
                <div>{ display }</div>

            )}
            
        </div>
    );

}

export default ViewWorkout;