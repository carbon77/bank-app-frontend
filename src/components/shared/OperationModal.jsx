import {Avatar, Box, Divider, Modal, Paper, Typography, useTheme} from "@mui/material";
import {convertDateTime, getAccountAvatarIcon, getOperationIconByCategory} from "../../utils";
import {Link} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
}

export function OperationModal({open, onClose, operation, account}) {
    const theme = useTheme()

    if (!operation) {
        return null
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Paper elevation={2} sx={style}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    py: '20px',
                    bgcolor: theme.palette.primary.main,
                }}>
                    <Typography color={"white"}>{convertDateTime(operation.createdAt)}</Typography>
                    <Avatar sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                    }}>
                        {getOperationIconByCategory(operation)}
                    </Avatar>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    py: '20px',
                }}>
                    <Typography variant={"h5"}>{operation.category.name}</Typography>
                    <Typography variant={"h4"} sx={{
                        color: operation.status === 'FAILED' ? theme.palette.error.main : ''
                    }}>
                        {operation.type === 'EXPENSE' ? '-' : '+'}{operation.amount} ₽
                    </Typography>
                    {operation.status === 'FAILED' ? (
                        <Typography sx={{
                            p: '0',
                            color: operation.status === 'FAILED' ? theme.palette.error.main : '',
                        }}>Операция не прошла</Typography>
                    ) : null}
                </Box>
                <Divider/>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    p: '10px 30px',
                }}>
                    <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                        {getAccountAvatarIcon(account.accountType)}
                    </Avatar>
                    <Link style={{textDecoration: 'none'}} to={`/accounts/${account.id}`}>{account.name}</Link>
                </Box>
                <Divider/>
                {!!operation.extraFields ? operation.extraFields.map((field, idx) =>
                    <>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: '10px 30px',
                        }} key={idx}>
                            <Typography>
                                {field.name}
                            </Typography>
                            <Typography>
                                {field.value}
                            </Typography>
                        </Box>
                        <Divider/>
                    </>
                ) : null}
            </Paper>
        </Modal>
    );
}