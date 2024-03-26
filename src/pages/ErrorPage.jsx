import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";

export function ErrorPage() {
    const navigate = useNavigate()

    function onButtonClick() {
        navigate(-1)
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h4">Page Not Found</Typography>
            <Button variant="contained" color="primary" onClick={onButtonClick}>Go Home</Button>
        </div>
    );
}