import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Test = () => {

    const [data, setData] = useState([]);
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        
        const data = {body: content};

        let response = await axios.post("http://localhost:3030/comments", data);

        if(response){
            alert("data submitted successfully");
        }else{
            alert("something went wrong");
        }

        FetchData();
    }

    const FetchData = () => {
        fetch('http://localhost:3030/comments')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        FetchData();    
    }, [])
    return (
        <Container>
            <Input className="input">
                <input value={content} onChange={(event) => setContent(event.target.value)}/>
                <button onClick={handleSubmit}>Click Me!</button>
            </Input>
            <Output className="output">
                {JSON.stringify(data)}
            </Output>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

const Input = styled.div`
    height: 100%;
    width: 300px;
`;

const Output = styled.div`
    width: 100%;
    height: 100%;
`;

export default Test;
