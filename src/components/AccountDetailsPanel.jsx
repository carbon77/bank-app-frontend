import {Box, Stack, Typography} from "@mui/material";

export function AccountDetailsPanel({details}) {
    const fields = [
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
                        {details[field.name]}
                    </Typography>
                </Box>
            ))}
        </Stack>
    )
}