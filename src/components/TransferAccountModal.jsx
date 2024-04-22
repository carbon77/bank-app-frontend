import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";

export function TransferAccountModal({
                                         open,
                                         onClose,
                                         onSubmit,
                                     }) {
    const [transferAmount, setTransferAmount] = useState('')
    const [toNumber, setToNumber] = useState('')
    const [message, setMessage] = useState('')

    const handleChange = (setField) => (e) => {
        if (!isNaN(e.target.value)) {
            setField(e.target.value)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Перевод</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={2} width={'400px'}>
                <TextField
                    autoFocus
                    required
                    label={"Номер получателя"}
                    fullWidth
                    value={toNumber}
                    onChange={handleChange(setToNumber)}
                    size={"small"}
                />
                <TextField
                    required
                    label={"Сумма"}
                    fullWidth
                    value={transferAmount}
                    onChange={handleChange(setTransferAmount)}
                    size={"small"}
                />
                <TextField
                    multiline
                    rows={4}
                    label={"Сообщение"}
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    size={"small"}
                />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant={"contained"} onChange={onSubmit}>Перевести</Button>
            </DialogActions>
        </Dialog>
    )
}