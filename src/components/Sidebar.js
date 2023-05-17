import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Links = [
    {name: "Home", url: "/"},
    {name: "Add Scenarios", url: "/AddScenario"},
    {name: "All Scenarios", url: "/AllScenario"},
    {name: "Add Vehicle", url: "/AddVehicle"},
]

const Sidebar = (props) => {
    return (
        <Section>
            {Links.map((obj, index) => {
                if(props.class === obj.name){
                    return <Poppeddiv key={index}>
                        <Poplink key={obj.name} to={obj.url}>{obj.name}</Poplink>
                    </Poppeddiv>
                }else{
                    return <Normaldiv key={index}>
                        <Normallink key={obj.name} to={obj.url}>{obj.name}</Normallink>
                    </Normaldiv>
                }
            })}
        </Section>
    )
}

const Section = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: rgba(190, 189, 189, 0.7);
    width: 20%;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 20px;
`;

const Poppeddiv = styled.div`
    width: 100%;
    height: 50px;
    opacity: 0.8;
    background-color: white;
    display: flex;
    align-items: center;
`;

const Normaldiv = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgb(49, 134, 232);
    }
`;

const Poplink = styled(Link)`
    width: 100%;
    padding: 30px;
    text-decoration: none;
    font-size: large;
    font-weight: 600;
    color: rgb(49, 134, 232);
`;

const Normallink = styled(Link)`
    width: 100%;
    padding: 30px;
    text-decoration: none;
    font-size: large;
    font-weight: 600;
    color: black;

`;

export default Sidebar;