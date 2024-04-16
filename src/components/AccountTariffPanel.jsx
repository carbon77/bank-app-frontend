import {Box, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export function AccountTariffPanel({user, account}) {
    const initialFields = [
        {
            title: 'Баланс',
            get: () => `${account.balance} ₽`,
        },
    ]
    const [fields, setFields] = useState(initialFields)

    useEffect(() => {
        if (account.accountType === 'CREDIT') {
            setFields(fields => [
                ...initialFields,
                {
                    title: 'Кредитный лимит',
                    get: () => account.accountLimit,
                },
                {
                    title: 'Процентная ставка',
                    get: () => `${account.interestRate}%`,
                },
            ])
        } else if (account.accountType === 'SAVINGS') {
            setFields(fields => [
                ...initialFields,
                {
                    title: 'Ставка',
                    get: () => `${account.rate}%`,
                },
            ])
        } else {
            setFields(initialFields)
        }
    }, [account])

    return (
        <Stack spacing={3} width={"60%"}>
            {fields.map(field => (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography>
                        {field.title}
                    </Typography>
                    <Typography>
                        {field.get()}
                    </Typography>
                </Box>
            ))}
        </Stack>
    )
}