import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const DeleteButton = (props) => {
    const {index, vehicles, setVehicles, UpdateVehicles} = props;

    const handleDelete = () => {
        let array = [...vehicles];
        array.splice(index, 1);
        setVehicles(array);

        UpdateVehicles(array);
    }
    return (
        <>
            <DeleteOutlineOutlinedIcon  onClick={handleDelete}/>
        </>
    )
}

export default DeleteButton;