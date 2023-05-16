import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OneScenario = (props) => {
    const {scenario, fetchData} = props;

    const navigate = useNavigate();

    const HandleAddVehicle = () => {
        const url = `/AddVehicle/${scenario.id}/edit`;
        navigate(url);
    }

    const HandleEdit = () => {
        const url = `/AddScenario/${scenario.id}/edit`;
        navigate(url);
    }

    const HandleDelete = () => {
        const url = `http://localhost:3030/simulation/${Number(scenario.id)}`
        axios.delete(url);
        window.location.reload()
    }
    
    return (
        <tr>
            <td>{scenario.id}</td>
            <td>{scenario.scenario}</td>
            <td>{scenario.Time}</td>
            <td>{scenario.Vehicles.length}</td>
            <td onClick={HandleAddVehicle}><AddCircleIcon /></td>
            <td onClick={HandleEdit}><ModeEditOutlineOutlinedIcon /></td>
            <td onClick={HandleDelete}><DeleteOutlineOutlinedIcon /></td>
        </tr>
    )
}

export default OneScenario;