import { useEffect, useState } from "react";
import { styled } from "styled-components";

const colors = [
    'rgb(255, 0, 0)',        // Red
    'rgb(0, 255, 0)',        // Green
    'rgb(255, 255, 0)',      // Yellow
    'rgb(255, 0, 255)',      // Magenta
    'rgb(0, 255, 255)',      // Cyan
    'rgb(128, 128, 128)',    // Gray
    'rgb(255, 165, 0)',      // Orange
    'rgb(128, 0, 128)',      // Purple
    'rgb(0, 128, 128)',      // Teal
    'rgb(128, 128, 0)',      // Olive
    'rgb(255, 192, 203)',    // Pink
    'rgb(255, 255, 255)',    // White
    'rgb(128, 0, 0)',        // Maroon
    'rgb(0, 128, 0)',        // Green
    'rgb(0, 0, 128)',        // Navy
    'rgb(128, 128, 128)',    // Silver
    'rgb(128, 128, 0)',      // Olive
    'rgb(0, 128, 128)',      // Teal
    'rgb(255, 255, 255)',    // White
    'rgb(0, 0, 255)',        // Blue
];
const MovingElement = (props) => {
        const {obj, index, simulationStart} = props;
        const [coordinateX, setCoordinateX] = useState(Number(obj.x));
        const [coordinateY, setCoordinateY] = useState(Number(obj.y));
        const direction = obj.direction;
        const speed = Number(obj.speed);debugger


        useEffect(() => {
            let interval;
            if(simulationStart){
                if(direction === "Towards")
                interval = setInterval(() => {
                    setCoordinateX(prevState => prevState + speed);
                }, 200)

                if(direction === "Backwards")
                    interval = setInterval(() => {
                    setCoordinateX(prevState => prevState - speed);
                }, 200)

                if(direction === "Upwards")
                    interval = setInterval(() => {
                    setCoordinateY(prevState => prevState - speed);
                }, 200)

                if(direction === "Downwards")
                    interval = setInterval(() => {
                    setCoordinateY(prevState => prevState + speed);
                }, 200)
            }else{
                clearInterval(interval);
                setCoordinateX(Number(obj.x));
                setCoordinateY(Number(obj.y));
            }

            return () => {
                clearInterval(interval);
            };
        }, [simulationStart, props])

    return (
        <>
            <MovableItem key={obj.name+obj.id} color={colors[index%20]} x={coordinateX} y={coordinateY}>{index + 1}</MovableItem>
        </>
    )
}

const MovableItem = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${props => props.color} ;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    color: black;
    font-weight: 600;
`;

export default MovingElement;