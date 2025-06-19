import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "shared/hooks/hooks";
import {onLogin} from "entity/user";


const ADMIN_CREDENTIALS = {username: "admin", password: "admin"};


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useAppDispatch()

    const handleLogin = () => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // setAuth(true);

            dispatch(onLogin({username}))
        } else {
            alert("Неверные данные входа");
        }
    };

    return (
        <Box p={4} display="flex" flexDirection="column" gap={2} maxWidth={300}>
            <Typography variant="h6">Авторизация</Typography>
            <TextField label="Логин" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Пароль" type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" onClick={handleLogin}>Войти</Button>
        </Box>
    );
};

export default Login;