
const ViewWeightTraining = (props) => {

    // props for Name Reps Sets and Weight

    //method that goes through each workout
    //for each workout the method must check if cardio or weight
    //and will display the exericse in the the correct format
    //these exercises are mapped to each workout 
    //each indiviudal workout will be displayed
    
    const name = props.name;
    const reps = props.reps;
    const sets = props.sets;
    const weight = props.weight;


    return (
        
                                             
            <ul className="list-group mt-3 d-flex flex-row">
                <li className="list-group-item"> <strong>{name}</strong></li>
                <li className="list-group-item">Reps: <strong>{reps}</strong></li>
                <li className="list-group-item">Sets: <strong>{sets}</strong></li>
                <li className="list-group-item">Weight (kg): <strong>{weight}</strong></li>
            </ul>

        
    )
}

export default ViewWeightTraining;