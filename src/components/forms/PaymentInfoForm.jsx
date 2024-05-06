import {Panel} from "../panels/Panel";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {CustomNumericFormat, CustomPatternFormat} from "../../utils";
import React from "react";

export function PaymentInfoForm({paymentInfo, paymentData, setPaymentData}) {
    function handleDataChange(field) {
        return e => {
            setPaymentData({
                ...paymentData,
                [field]: e.target.value,
            })
        }
    }

    if (!paymentInfo || !paymentData) {
        return <div>Loading...</div>
    }

    return (
        <Panel>
            <Typography variant={"h5"} mb={2}>Введите данные</Typography>
            <Stack spacing={2}>
                {paymentInfo.fields.map(field => {
                    if (field.type === 'CHOICE') {
                        return (
                            <FormControl size={"small"} fullWidth key={field.name}>
                                <InputLabel>{field.name}</InputLabel>
                                <Select
                                    label={field.name}
                                    onChange={handleDataChange(field.name)}
                                >
                                    {field.choices.map(choice => (
                                        <MenuItem key={choice} value={choice}>{choice}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )
                    }

                    const inputProps = {
                        key: field.name,
                        label: field.name,
                        value: paymentData[field.name],
                        onChange: handleDataChange(field.name),
                        format: field.pattern,
                        size: "small",
                        helperText: field.description,
                        mask: '_',
                        InputProps: {
                            startAdornment: field.prefix ?
                                <InputAdornment position={'start'}>{field.prefix}</InputAdornment> : null,
                            endAdornment: field.suffix ?
                                <InputAdornment position={'end'}>{field.suffix}</InputAdornment> : null,
                        }
                    }

                    if (field.type === 'NUMBER') {
                        return <CustomNumericFormat {...inputProps}/>
                    }

                    if (!field.pattern) {
                        return <TextField {...inputProps} />
                    }

                    return <CustomPatternFormat {...inputProps}/>
                })}
            </Stack>
        </Panel>
    )
}
