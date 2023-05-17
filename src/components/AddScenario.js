import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const AddScenario = () => {
    const navigate = useNavigate();

    const [scenarioName, setScenarioName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [scenarioTime, setScenarioTime] = useState("");
    const [errorTime, setErrorTime] = useState("");

    const AddData = async() => {
        setErrorName("");
        setErrorTime("");
        if(scenarioName === ""){
            setErrorName("Scenario is required!")
            return;
        }
        if(scenarioTime === ""){
            setErrorTime("Scenario is required!");
            return;
        }
        const data = {scenario: scenarioName, Time: Number(scenarioTime), Vehicles: []};
        
        let response = await axios.post("http://localhost:3030/simulation", data);
        if(response){
            alert("data submitted successfully");
            setScenarioName("");
            setScenarioTime("");
        }else{
            alert("something went wrong");
        }
    }

    const ResetData = () => {
        setScenarioName("");
        setScenarioTime("");
        setErrorName("");
        setErrorTime("");
    }

    const Back = () => {
        navigate('/');
    }

    return (
    <Container>
        <Sidebar class={"Add Scenarios"}/>
        <Section>
            <Para>Scenario / add</Para>
            <Heading>Add Scenario</Heading>

            <Inputbox>
                <Scenarioname>
                    <label htmlFor="scenario-input">Scenario Name</label>
                    <input id="scenario-input" placeholder="Test Scenario" value={scenarioName} onChange={(event) => setScenarioName(event.target.value) }/>
                    <p>{errorName}</p>
                </Scenarioname>
                <ScenarioTime>
                    <label htmlFor="scenario-time">Scenario Time (Seconds)</label>
                    <input type="number" pattern="[0-9]*" id="scenario-time" placeholder="10" value={scenarioTime} onChange={(event) => setScenarioTime(event.target.value) }/>
                    <p>{errorTime}</p>
                </ScenarioTime>
            </Inputbox>
            <Buttons>
                <Add onClick={AddData}>Add</Add>
                <Reset onClick={ResetData}>Reset</Reset>
                <Goback onClick={Back}>Go Back</Goback>
            </Buttons>
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
    background-color: black;
    height: 100vh;
    width: 80%;
    box-sizing: border-box;
    padding: 10px 60px;
`;

const Para = styled.p`
    color: white;
`;

const Heading = styled.h1`
    color: white;
    margin-top: 30px;
    font-weight: 500;
`;

const Inputbox = styled.div`
    width: 100%;
    height: 150px;
    background-color: rgb(45, 44, 44);
    display: flex;
    justify-content: space-around;
`;

const Scenarioname = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    margin-top: 25px;
    /* text-align: center; */
    & > input{
        background-color: black;
        color: rgb(181, 178, 178);
        width: 300px;
        margin-top: 10px;
        height: 35px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        padding-left: 30px;
    }
    & > p{
        width: 100%;
        text-align: center;
        /* border: 2px solid red; */
        color: red;
        background-color: transparent;
        border-radius: 5px;
    }
`;

const ScenarioTime = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    margin-top: 25px;
    /* text-align: center; */
    & > input{
        background-color: black;
        color: rgb(181, 178, 178);
        width: 300px;
        margin-top: 10px;
        height: 35px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        padding-left: 30px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    & > input[type=number] {
    -moz-appearance: textfield;
    }

    & > p{
        width: 100%;
        text-align: center;
        /* border: 2px solid red; */
        color: red;
        background-color: transparent;
        border-radius: 5px;
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
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(74, 199, 36 , 0.6);
    }
`;
const Reset = styled.button`
    height: 35px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: rgb(242, 182, 29);
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(242, 182, 29, 0.6);
    }
`;
const Goback = styled.button`
    height: 35px;
    width: 120px;
    border: none;
    border-radius: 5px;
    background-color: rgb(29, 193, 242);
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(29, 193, 242, 0.6);
    }
`;
export default AddScenario;