import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import OneScenario from "./Scenario";
import { useNavigate } from "react-router-dom";

const array = ["Scenario Id", "Scenario Name", "Scenario Time", "Number of Vehicle", "Add Vehicle", "Edit", "Delete"]

const AllScenario = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const FetchData = async() => {
        const response = await axios.get('http://localhost:3030/simulation');
        setData(response.data);
    }

    useEffect(() => {
        FetchData();
    }, [])

    const HandleDeleteAll = () => {
        data.forEach((scenario) => {
            const url = `http://localhost:3030/simulation/${Number(scenario.id)}`
            axios.delete(url);
        })
        window.location.reload()
    }

    return (
        <Container>
            <Sidebar class={"All Scenarios"}/>
            <Section>
                <div>
                    <Header>All Scenarios</Header>
                    <Buttons>
                        <Newscenario onClick={() => navigate("/AddScenario")}>New Scenario</Newscenario>
                        <Addvehicle onClick={() => navigate("/AddVehicle")}>Add Vehicle</Addvehicle>
                        <Deleteall onClick={HandleDeleteAll}>Delete All</Deleteall>
                    </Buttons>
                </div> 
                <Table>
                        <Thead>
                            <tr>
                                {array.map((ele) => {
                                    return <th key={ele}>{ele}</th>
                                })}
                            </tr>
                        </Thead>
                        
                        {data && <Tbody>
                            {data.map((scenario) => {
                                return <OneScenario scenario={scenario} fetchData={FetchData}/>
                            })}
                            
                        </Tbody>}
                    </Table>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
`;

const Section = styled.div`
    margin-left: 20%;
    background-color: black;
    box-sizing: border-box;
    width: 80%;
    height: 100vh;
    padding: 20px 40px;
    & > div{
        display: flex;
        justify-content: space-between;
    }
`;

const Header = styled.header`
    color: white;
`;

const Buttons = styled.div`
    
`;

const Newscenario = styled.button`
    background-color: rgb(29, 193, 242);
    border: none;
    border-radius: 5px;
    color: white;
    height: 30px;
    width: 120px;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(29, 193, 242, 0.6);
    }
`;

const Addvehicle = styled.button`
    background-color: rgb(19, 240, 38);
    border: none;
    border-radius: 5px;
    margin-left: 20px;
    color: white;
    height: 30px;
    width: 120px;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(19, 240, 38, 0.6);
    }
`;

const Deleteall = styled.button`
    background-color: rgb(245, 106, 20);
    border: none;
    border-radius: 5px;
    margin-left: 20px;
    color: white;
    height: 30px;
    width: 120px;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(245, 106, 20, 0.6);
    }
`;

const Table = styled.table`
    margin-top: 40px !important;
    border-collapse: collapse;
    width: 100%;
`;

const Thead = styled.thead`
    height: 40px;  
    background-color: rgb(53, 53, 53);
    color: white;
    & > tr > th{
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

export default AllScenario;