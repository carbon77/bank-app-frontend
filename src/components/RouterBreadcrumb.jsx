import {Breadcrumbs, Link, Typography} from "@mui/material";
import {Link as RouterLink, useMatches} from "react-router-dom";
import {useEffect, useMemo} from "react";

function LinkRouter(props) {
    return <Link {...props} component={RouterLink}/>;
}

export const RouterBreadcrumb = () => {
    const matches = useMatches()
    const links = useMemo(() => matches.filter(({pathname}) => pathname === '/' || !pathname.endsWith('/')), [matches])

    useEffect(() => {
        console.log(matches)
    }, [matches])

    return (
        <Breadcrumbs>
            {links.map((match, index) => {
                const isLast = index === links.length - 1

                return isLast ? (
                    <Typography color={"primary"} key={match.id}>{match.handle?.title || match.pathname}</Typography>
                ) : (
                    <LinkRouter
                        key={match.id}
                        to={match.pathname}
                        underline={"hover"}
                        color={"inherit"}
                    >
                        {match.handle?.title || match.pathname}
                    </LinkRouter>
                )
            })}
        </Breadcrumbs>
    )
}