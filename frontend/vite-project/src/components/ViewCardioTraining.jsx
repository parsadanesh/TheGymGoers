const ViewCardioTraining = ({name, duration, date}) => {
    


    return (
            <ul className="list-group mt-3 d-flex flex-row">
                <li className="list-group-item"> <strong>{name}</strong></li>
                <li className="list-group-item">Reps: <strong>{duration}</strong></li>
                <li className="list-group-item">Sets: <strong>{date}</strong></li>
            </ul>
    )
}

export default ViewCardioTraining;