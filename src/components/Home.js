import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { styled } from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import EditButton from "./Editbutton";
import MovingElement from "./MovingElement";

const array = ["Vehicle Id", "Vehicle Name", "Position X", "Position Y", "Speed", "Direction", "Edit", "Delete"]
const array2 = [];
for(let i=1; i<=84; i++){
    array2.push(i);
}
const Home = () => {
    const [data, setData] = useState([]);
    const [scenario, setScenario] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [time, setTime] = useState(0);
    const [simulationStart , setSimulationStart] = useState(false);
    const navigate = useNavigate();

    const FetchData = async() => {
        const response = await axios.get('http://localhost:3030/simulation');
        setData(response.data);
    }

    useEffect(() => {
        FetchData();
    }, [])
    
    useEffect(() => {
        if(data.length > 0){
            setScenario(data[0].id);
            setTime(data[0].Time)
        }
    }, [data])

    useEffect(() => {
        if(scenario != ""){
            data.map((obj) => {
                if(obj.id == scenario){
                    setVehicles([...obj.Vehicles]);
                    setTime(obj.Time)
                }
            })
        }
    }, [scenario])

    const UpdateVehicles = async(array) => {
        let obj;
        data.forEach((sce) => {
            if(sce.id == scenario){
                obj = sce;
            }
        })
        obj.Vehicles = array;
        
        const response = await axios.put(`http://localhost:3030/simulation/${scenario}`, obj);
    }

    const handleNavigate = () => {
        navigate("/AddVehicle")
    }

    const handleSimulation = () => {
        setSimulationStart(true);
        setTimeout(() => {
            setSimulationStart(false);
        }, time*1000)
    }

    const HandleScenario = (event) => {
        setScenario(event.target.value);
    }

    return (
        <Container>
            <Sidebar class={"Home"}/>
            <Section> 
                <Scenario>
                    <Label htmlFor="select">Scenario</Label>
                    <Select id="select" value={scenario} onChange={HandleScenario}>
                        {data && data.map((obj) => {
                            return <option key={obj.scenario} value={obj.id}>{obj.scenario}</option>
                        })}
                    </Select>
                    <Table>
                        <Thead>
                            <tr>
                                {array.map((ele) => {
                                    return <th key={ele}>{ele}</th>
                                })}
                            </tr>
                        </Thead>
                        <Tbody>
                            {vehicles && vehicles.map((obj, index) => {
                                return <tr>
                                    <td key={index+1}>{index + 1}</td>
                                    <td key={obj.name}>{obj.name}</td>
                                    <td key={obj.x+'x'}>{obj.x}</td>
                                    <td key={obj.y+'y'}>{obj.y}</td>
                                    <td key={obj.speed+"speed"}>{obj.speed}</td>
                                    <td key={obj.direction+index}>{obj.direction}</td>
                                    <td ><EditButton index={index} scenario={scenario}/></td>
                                    <td><DeleteButton index={index} vehicles={vehicles} setVehicles={setVehicles} UpdateVehicles={UpdateVehicles}/></td>
                                </tr>
                            })}
                        </Tbody>
                    </Table>
                    {vehicles.length == 0 && <NoVehicle> <SentimentVeryDissatisfiedIcon /> <p>no vehicles has been added!</p> <Addveh onClick={handleNavigate}>Add Vehicles</Addveh></NoVehicle>}
                </Scenario>
                <Buttons>
                    <Start key={"start"} onClick={handleSimulation}>Start Simulation</Start>
                    <Stop key={"stop"} onClick={() => setSimulationStart(false)}>Stop Simulation</Stop>
                </Buttons>
                <Simulator>
                    <Graph>
                        {array2.map((ele) => {
                            return <Box key={ele}></Box>
                        })}
                    </Graph>
                    <Automobile>
                        {vehicles.map((obj, index) => {
                            return <MovingElement obj={obj} index={index} simulationStart={simulationStart}/>
                        })}
                    </Automobile>
                    
                </Simulator>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const Section = styled.div`
    margin-left: 20%;
    width: 80%;
    min-height: 100vh;
    color: white;
    background-color: black;
    box-sizing: border-box;
    padding: 10px 30px 20px 30px;
`;

const Scenario = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Select = styled.select`
    width: 150px;
    height: 30px;
    border-radius: 5px;
    border: 2px solid rgb(78, 242, 240);
    color: rgb(194, 192, 192);
    background-color: rgb(0, 0, 0);
`;

const Label = styled.label`

`;

const Table = styled.table`
    margin-top: 40px !important;
    border-collapse: collapse;
`;

const Thead = styled.thead`
    height: 40px;  
    background-color: rgb(53, 53, 53);
    & > th{
        font-weight: 500;
    }
`;

const Tbody = styled.tbody`
    text-align: center;
    background-color: rgb(216, 216, 219);
    & > tr{
        border: 2px solid black;
        color: black;
        & > td{
            height: 30px;
            font-weight: 500;
        }
    }
`;

const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 40px;
`;

const Start = styled.button`
    background-color: rgb(64, 237, 48);
    height: 40px;
    width: 140px;
    font-size: medium;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    color: white;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(64, 237, 48, 0.6);
    }
`;

const Stop = styled.button`
    background-color: rgb(12, 141, 246);
    height: 40px;
    width: 140px;
    font-size: medium;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    color: white;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(12, 141, 246, 0.6);
    }
`;

const Simulator = styled.div`
    margin-top: 20px;
    border: 2px solid green;
    height: 450px;
    width: 1168px;
    position: relative;
    overflow: hidden;
`;

const Box = styled.div`
    border: 1px solid rgba(71, 127, 71, 0.5);
`;

const NoVehicle = styled.div`
    width: 100%;
    height: 40px;
    font-size: medium;
    font-weight: 500;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    word-spacing: 5px;
    & > p{
        margin: 0px 10px;
    }
`;

const Addveh = styled.button`
    background-color: white;
    color: blue;
    border-radius: 5px;
    height: 30px;
    width: 100px;
    font-weight: 600;
`;

const Graph = styled.div`
    height: 450px;
    width: 1168px;
    display: grid;
    grid-template-rows: repeat(6, auto);
    grid-template-columns: repeat(14, auto);
`;

const Automobile = styled.div`
    position: relative;
    top: -450px;
    left: 0px;
    height: 450px;
    width: 1168px;
    background-color: transparent;
`;


export default Home;