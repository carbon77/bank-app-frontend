import {Paper, Stack, Typography} from "@mui/material";
import {convertDate} from "../utils";

export function PassportPanel({passport}) {
    const fields = [
        {name: 'Серия и Номер', value: `${passport.series} ${passport.number}`},
        {name: 'Дата выдачи', value: convertDate(passport.issueDate)},
        {name: 'Имя', value: passport.firstName},
        {name: 'Фамилия', value: passport.lastName},
        {name: 'Отчество', value: passport.patronimic},
        {name: 'Код отдела', value: passport.departmentCode},
        {name: 'Дата рождения', value: convertDate(passport.birthday)},
    ]

    return (
        <Paper elevation={3} sx={{
            p: '1em 2em',
        }}>
            <Typography variant={"h5"}>Паспорт</Typography>
            <Stack>
                {fields.map(field => (
                    <Stack key={field.name} sx={{p: '10px 0'}}>
                        <Typography sx={{
                            fontSize: '.8em'
                        }}>{field.name}</Typography>
                        <Typography sx={{
                            fontWeight: 'bold'
                        }}>{field.value}</Typography>
                    </Stack>
                ))}
            </Stack>
        </Paper>
    )
}