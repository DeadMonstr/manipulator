import React from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useGetHistoryQuery} from "entity/history/model/historyApi";

export const History = () => {

    const {data, error, isLoading} = useGetHistoryQuery()

    return (
        <Container>
            <Typography variant="h6">История команд</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Исходная</TableCell>
                        <TableCell>Оптимизированная</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Время</TableCell>
                        <TableCell>От</TableCell>
                        <TableCell>До</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.original}</TableCell>
                            <TableCell>{item.optimized}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{`(${item.from.x}, ${item.from.y})`}</TableCell>
                            <TableCell>{`(${item.to.x}, ${item.to.y})`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

