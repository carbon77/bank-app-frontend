import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export function CreateCardDialog({
                                     open, onClose, onSubmit,
                                 }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {"Добавление новой карты"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы действительно хотите добавить новую карту?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмета</Button>
                <Button onClick={onSubmit} variant={'primary'} autoFocus>
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    )
}