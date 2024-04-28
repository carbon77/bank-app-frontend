import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {PatternFormat} from "react-number-format";
import {MoneyInputFormat} from "../utils";

function ToNumberFormat(props) {
    const {onChange, ...other} = props
    return <PatternFormat
        {...other}
        onValueChange={(values) => {
            onChange({
                target: {
                    value: values.value,
                }
            })
        }}
        format={"#### #### #### ####"}
        mask={"_"}
        valueIsNumericString
    />
}


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

    const handleSubmit = e => {
        e.preventDefault()
        console.log(toNumber)
    }

    return (
        <Dialog component={'form'} onSubmit={handleSubmit} open={open} onClose={onClose}>
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
                        InputProps={{
                            inputComponent: ToNumberFormat,
                        }}
                    />
                    <TextField
                        required
                        label={"Сумма"}
                        fullWidth
                        value={transferAmount}
                        onChange={handleChange(setTransferAmount)}
                        size={"small"}
                        InputProps={{
                            inputComponent: MoneyInputFormat,
                        }}
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
                <Button variant={"contained"} type={"submit"}>Перевести</Button>
            </DialogActions>
        </Dialog>
    )
}