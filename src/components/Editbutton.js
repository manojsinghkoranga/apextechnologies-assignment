import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';

const EditButton = (props) => {
    const {index, scenario} = props;
    const navigate = useNavigate();
    const handleNavigate = () => {
        const url = `/EditVehicle/${scenario}/${index}/edit`
        navigate(url);
    }
    return (
        <>
            <ModeEditOutlineOutlinedIcon onClick={handleNavigate}/>
        </>
    )
}

export default EditButton;