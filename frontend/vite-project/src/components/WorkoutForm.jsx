import { useState, useEffect } from "react"
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CardioTraining from "./CardioTraining";
import WeightTraining from "./WeightTraining";
import axios from "axios";

const WorkoutForm = (props) => {
    // create some hooks for a workout object

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedOptionText, setSelectedOptionText] = useState("");
    const [duration, setDuration] = useState(null);
    const [workout, setWorkout] = useState({ exercises: [] });
    const [exercises, setExercises] = useState([]);
    const [workRef, setWorkRef] = useState(false);

    const [weightTraining, setWeightTraining] = useState({ name: "", reps: "", sets: "", weight: "" });
    
    const logWorkout = async (e) => {
        try {
            const res = await axios.post("http://localhost:3000/logWorkout", { existingUser: props.user, workoutDetails: workout });
            if (res.status === 201) console.log("Workout Registered");
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
    

    // EXERICE = type, (reps, sets, weight, duration) - these are optional depends on the type

    //method that created a new workout using the states
    useEffect(() => {
        if (exercises.length > 0) {
            setWorkRef(true);
            console.log(exercises);
        }
        
    }, [exercises])


    useEffect(() => {
        if (weightTraining.name || weightTraining.reps || weightTraining.sets || weightTraining.weight) {
            // arr.push(weightTraining);
            setExercises(prevWorkout => [...prevWorkout, weightTraining]);
        }





    }, [weightTraining]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setWorkout({ exercises: exercises });

        logWorkout();


    }

    const handleExerciseChange = (e) => {
        setSelectedOptionText(e.target.options[e.target.selectedIndex].text);
        setSelectedExercise(Number(event.target.value));
    }

    return (
        <div className="container container-md mt-3 bg-light">
            <h1>Welcome {props.user.email}</h1>
            <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center">
                <div className=" col-12 col-sm-8 col-md-6 col-lg-4">
                    <select className="form-control" onChange={handleExerciseChange}>
                        <option value="-1">Select an exercise</option>
                        <option value="0">Flat DB Chest Press</option>
                        <option value="0">Incline DB Chest Press</option>
                        <option value="0">Flat Barbell Chest Press</option>
                        <option value="0">Incline Barbell Chest Press</option>
                        <option value="0">Squat</option>
                        <option value="0">Lat Pulldown</option>
                        <option value="0">DB Overhead Press</option>
                        <option value="0">Barbell Row</option>
                        <option value="0">Chest-Supported Row</option>
                        <option value="0">Lateral Raise</option>
                        <option value="0">Leg Extension</option>
                        <option value="0">Leg Press</option>
                        <option value="0">DB Curl</option>
                        <option value ="1">Cardio</option>
                    </select>
                    </div> 
                </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={!workRef}>Add a new workout</button>

            </form>

        
            {selectedExercise === 1 &&
                // <h1>HI</h1>
                <CardioTraining setDuration={setDuration} />
            }

            {selectedExercise === 0 &&
                <WeightTraining selectedOptionText={selectedOptionText} setWeightTraining={setWeightTraining} />
                }
                
            


        </div>
    )

}

export default WorkoutForm