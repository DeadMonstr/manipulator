import React, {useEffect, useRef, useState} from 'react';


import img from "assets/batman.png"
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/hooks/hooks";

import {getAnimation, getPositions} from "../model/characterSelector";
import {onChangePosWithTake} from "../model/characterSlice";


interface CharacterProps {
    cellSize: number;
}


export const Character = ({ cellSize} : CharacterProps) => {

    const positions = useSelector(getPositions)
    const {duration} = useSelector(getAnimation)

    const [stepIndex, setStepIndex] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const position = positions[stepIndex] || { x: 0, y: 0, take: 2 };

    useEffect(() => {

        if (positions.length === 0) return;

        setStepIndex(0);

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setStepIndex((prev) => {
                if (prev < positions.length - 1) {
                    return prev + 1;
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return prev;
                }
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [ positions]);



    const dispatch = useAppDispatch()

    useEffect(() => {
        if (position.take !== 2) dispatch(onChangePosWithTake(position))
    },[position])


    return (
        <Box
            sx={{
                width: 50,
                height: 50,
                position: 'absolute',
                top: `${(position.y * cellSize) + 50}px`,
                left: `${(position.x * cellSize) + 50}px`,
                transition: `top ${duration}s ease, left ${duration}s ease`,
                transform: 'translateY(-50%) translateX(-50%)',
            }}
        >
            <img width={40} height={40} src={img} alt=""/>
        </Box>
    );
};

