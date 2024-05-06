import {Box, Stack, Typography} from "@mui/material";

export function AccountDetailsPanel({account, user}) {
    const fields = [
        {
            title: 'Получатель',
            get: () => `${user.passport.patronimic} ${user.passport.firstName} ${user.passport.lastName}`,
        },
        {
            name: 'number',
            title: 'Счёт',
        },
        {
            name: 'bankName',
            title: 'Банк',
        },
        {
            name: 'correctionAccount',
            title: 'Корр. счёт',
        }, {
            name: 'bik',
            title: 'БИК',
        },
        {
            name: 'inn',
            title: 'ИНН',
        },
    ]

    function getDetail(field) {
        if (field.name) {
            return account.accountDetails[field.name]
        }
        return field.get()
    }

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
                        {getDetail(field)}
                    </Typography>
                </Box>
            ))}
        </Stack>
    )
}