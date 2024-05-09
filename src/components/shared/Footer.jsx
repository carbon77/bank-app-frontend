import {Box, Divider, Grid, IconButton, Stack, Typography, useTheme} from "@mui/material";
import {AccountBalance, Telegram} from "@mui/icons-material";

function FooterLink({children, ...other}) {
    const theme = useTheme()

    return (
        <Typography sx={{
            color: theme.palette.secondary.main,
            cursor: 'pointer',
            transition: '.1s',
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.secondary.dark,
            }
        }} {...other}>
            {children}
        </Typography>
    )
}

export function Footer() {
    const theme = useTheme()

    return (
        <Box component={"footer"} sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(2),
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Grid container sx={{
                maxWidth: {
                    md: '60%',
                    xs: '90%',
                }
            }}>
                <Grid item md={4} xs={12}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <AccountBalance/>
                        <Typography
                            variant={"h6"}
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                textDecoration: 'none',
                            }}
                        >
                            WaveBank
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Stack spacing={3}>
                        <FooterLink>О банке</FooterLink>
                        <FooterLink>Новости</FooterLink>
                        <FooterLink>Работа</FooterLink>
                    </Stack>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Stack spacing={3}>
                        <FooterLink
                            component={"a"}
                            href={"https://www.cbr-xml-daily.ru/"}
                        >Курсы валют, API</FooterLink>
                        <FooterLink>Контакты</FooterLink>
                        <FooterLink>Помощь</FooterLink>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{m: '1em 0'}} color={theme.palette.primary.contrastText}/>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant={"caption"}>© 2006—2024, АО «Wave Bank», официальный сайт, универсальная
                            лицензия ЦБ РФ № XXXX</Typography>
                        <IconButton size={"small"}>
                            <Telegram/>
                        </IconButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}