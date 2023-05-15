import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const AddVehicle = () => {
    const [data, setData] = useState([]);
    const [selectedScenario, setSelectedSccenario] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleSpeed, setVehicleSpeed] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [direction, setDirection] = useState("Towards");

    useEffect(() => {
        const FetchData = async() => {
            const response = await axios.get('http://localhost:3030/simulation');
            setData(response.data);

            if(response.data.length === 0){
                alert("create a scenario");
            }
        }
        FetchData();
    },[])

    useEffect(() => {
        if(data.length > 0){
            setSelectedSccenario(data[0].id);
        }
    }, [data])
    
    const AddData = async() => {
        let obj;
        data.forEach((scenario) => {
            if(scenario.id == selectedScenario){
                obj = scenario;
            }
        })
        const vehicle = {name: vehicleName, x: x, y: y, speed: vehicleSpeed, direction:direction};
        obj.Vehicles.push(vehicle);
        try{
            const response = await axios.put(`http://localhost:3030/simulation/${selectedScenario}`, obj);
            alert("Vehicle has been added.");

            setVehicleName("");
            setVehicleSpeed("");
            setX("");
            setY("");
            setDirection("Towards");
        }catch(error){
            console.log(error);
            alert("something went wrong");
        }
    
    }

    return (
        <Container>
            <Sidebar class={"Add Vehicle"}/>
            <Section>
                <Title>Vehicle / add</Title>
                <Header>Add Vehicle</Header>
                <Inputcontainer>
                    <List>
                        <label htmlFor="select-scenario">Scenarios List</label>
                        <select id="select-scenario" value={selectedScenario} onChange={(event) => {setSelectedSccenario(event.target.value)}}>
                            {data.map((obj) => {
                                return <option key={obj.id} value={obj.id}>{obj.scenario}</option>
                            })}
                        </select>
                    </List>
                    <Vname>
                        <label htmlFor="v-name">Vehicle Name</label>
                        <input id="v-name" placeholder="Target abc" value={vehicleName} onChange={(event) => {setVehicleName(event.target.value)}} />
                    </Vname>
                    <Vspeed>
                        <label htmlFor="v-speed">Speed</label>
                        <input type="number" pattern="[0-9]*" id="v-speed" placeholder="2" value={vehicleSpeed} onChange={(event) => {setVehicleSpeed(event.target.value)}} />
                    </Vspeed>
                    <Positionx>
                        <label htmlFor="pos-x">Position X</label>
                        <input type="number" pattern="[0-9]*" id="pos-x" value={x} onChange={(event) => {setX(event.target.value)}} />
                    </Positionx>
                    <Positiony>
                        <label htmlFor="pos-y">Position Y</label>
                        <input type="number" pattern="[0-9]*" id="pos-y" value={y} onChange={(event) => {setY(event.target.value)}} />
                    </Positiony>
                    <Direction>
                        <label htmlFor="direction">Direction</label>
                        <select id="direction" value={direction} onChange={(event) => {setDirection(event.target.value)}}>
                            <option value={"Towards"}>Towards</option>
                            <option value={"Backwards"}>Backwards</option>
                            <option value={"Upwards"}>Upwards</option>
                            <option value={"Downwards"}>Downwards</option>
                        </select>
                    </Direction>
                </Inputcontainer>
                <Buttons>
                    <Add onClick={AddData}>Add</Add>
                    <Reset>Reset</Reset>
                    <Goback>Go Back</Goback>
                </Buttons>

            </Section>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
`;

const Section = styled.div`
    margin-left: 20%;
    width: 80%;
    box-sizing: border-box;
    background-color: black;
    padding: 10px 40px;
`;

const Title = styled.p`
    color: white;
`;

const Header = styled.h1`
    color: white;
    font-weight: 600;
`;

const Inputcontainer = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 10px 30px 10px;
    background-color: rgb(61, 61, 59);
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    row-gap: 20px;
    
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > select{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Vname = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Vspeed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    & > input[type=number] {
        -moz-appearance: textfield;
    }
`;

const Positionx = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    & > input[type=number] {
    -moz-appearance: textfield;
    }
`;
const Positiony = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    & > input[type=number] {
    -moz-appearance: textfield;
    }
`;

const Direction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > select{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const Add = styled.button`
    height: 35px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: rgb(74, 199, 36);
    color: white;
    font-weight: 600;
`;
const Reset = styled.button`
    height: 35px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: rgb(242, 182, 29);
    color: white;
    font-weight: 600;
`;
const Goback = styled.button`
    height: 35px;
    width: 120px;
    border: none;
    border-radius: 5px;
    background-color: rgb(29, 193, 242);
    color: white;
    font-weight: 600;
`;

export default AddVehicle;