import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import {
    TextField,
    Button,
    Snackbar,
    Typography,
    Box,
    Grid,
    Slider
} from "@mui/material";

import {
    Character,
    getAnimation,
    getCharacter,
    setAnimationDuration,
    setBag
} from "feature/character";

import {compressSimple} from "shared/utils/optimizeSimple";
import {useAppDispatch, useAppSelector} from "shared/hooks/hooks";
import {onChangePosition} from "feature/character";
import {IPosition, takeType} from "shared/types/types";


import {useAddHistoryMutation, HistoryResp,History} from "entity/history";


const cellSize = 102;
const GRID_SIZE = 5;
export default function ManipulatorApp() {


    const {duration} = useSelector(getAnimation)
    const [createHistory, {}] = useAddHistoryMutation()


    const [input, setInput] = useState("");
    const [optimized, setOptimized] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const dispatch = useAppDispatch()
    const handleOptimize = () => {
        const clean = input.toUpperCase().replace(/[^ЛПВНОБ]/g, "");
        const result = compressSimple(clean);
        setOptimized(result);
        const positions = simulateMovement(clean);
        createHistory({
            original: clean,
            optimized: result,
            date: new Date().toLocaleString(),
            time: new Date().toLocaleString(),
            from: {...positions[0]},
            to: {...positions[positions.length - 1]}
        } as HistoryResp)
        dispatch(onChangePosition([{x: 0, y: 0, take: 2}, ...positions]))
        setSnackbarOpen(true);
    };


    const simulateMovement = (commands: string): IPosition[] => {
        let x: number = 0, y: number = 0, take: takeType = 2;
        const path: IPosition[] = [];

        for (const ch of commands) {
            if (ch === "Л") {
                x = Math.max(0, x - 1);
            } else if (ch === "П") {
                x = Math.min(GRID_SIZE - 1, x + 1);
            } else if (ch === "В") {
                y = Math.max(0, y - 1);
            } else if (ch === "Н") {
                y = Math.min(GRID_SIZE - 1, y + 1);
            } else if (ch === "О") {
                take = 1;
            } else if (ch === "Б") {
                take = 3;
            }
            path.push({x, y, take});
        }
        return path
    };


    const onChangeDuration = (event: Event, newValue: number) => {

        dispatch(setAnimationDuration(newValue))
    }


    return (
        <Box p={4} display="flex" flexDirection="column" gap={4}>


            <Typography variant="h5">Интерфейс управления манипулятором</Typography>
            <TextField
                label="Команды"
                multiline
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <Button variant="contained" onClick={handleOptimize}>Оптимизировать и выполнить</Button>

            {optimized && <Typography>Оптимизировано: <strong>{optimized}</strong></Typography>}


            <Box display={"flex"} gap={5}>
                <Box>
                    <Typography variant="h6">Поле {GRID_SIZE}x{GRID_SIZE}</Typography>
                    <Grid container spacing={1}>
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <GridBoard />
                            <Character
                                cellSize={cellSize}
                            />
                        </Box>
                    </Grid>
                </Box>
                <Box sx={{
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <Typography variant="h6">Duration {duration}</Typography>
                    <Slider
                        value={duration}
                        onChange={onChangeDuration}
                        defaultValue={1}
                        step={1}
                        marks
                        min={1}
                        max={5}
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        color="success"
                    />
                </Box>
            </Box>

            <History/>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Команды оптимизированы и выполнены успешно!"
            />


        </Box>
    );
}


const GridBoard = () => {


    const {posWithTake, bag} = useAppSelector(getCharacter)

    const [randomItems, setRandomItems] = useState<{ x: number; y: number, item: string }[]>([]);


    useEffect(() => {
        const itemPool = ['🧪', '💎', '🛠️', '⚡'];
        const usedPositions = new Set<string>();
        const numItems = 3;
        const newItems = Array.from({length: numItems}).map(() => {
            let x = 0, y = 0;
            do {
                x = Math.floor(Math.random() * GRID_SIZE);
                y = Math.floor(Math.random() * GRID_SIZE);
            } while (usedPositions.has(`${x},${y}`));

            usedPositions.add(`${x},${y}`);
            const item = itemPool[Math.floor(Math.random() * itemPool.length)];
            return {x, y, item};
        });
        setRandomItems(newItems);
    }, [])

    const dispatch = useAppDispatch()


    useEffect(() => {
        if (!posWithTake) return;


        const inPos = randomItems.find(item => item.x === posWithTake.x && item.y === posWithTake.y)
        if (inPos) {
            if (posWithTake.take === 1) {
                dispatch(setBag(inPos.item))
                setRandomItems(randomItems.filter(item => item.x !== posWithTake.x || item.y !== posWithTake.y))
            }
        } else if ( posWithTake.take === 3) {
            setRandomItems([...randomItems, {x: posWithTake.x, y: posWithTake.y, item: bag}])
        }
    }, [posWithTake, bag])


    return (

        <Grid sx={{p: 0}} container direction="column" spacing={0}>
            {Array.from({length: GRID_SIZE}).map((_, rowIdx) => (
                <Grid sx={{p: 0}} key={rowIdx} container spacing={0}>
                    {Array.from({length: GRID_SIZE}).map((_, colIdx) => (
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                border: '1px solid #ccc',
                                // backgroundColor: Math.random() > 0.5 ? 'lightgreen' : 'lightblue',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                            }}
                        >
                            {randomItems.find(item => item.x === colIdx && item.y === rowIdx)?.item}
                        </Box>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};
