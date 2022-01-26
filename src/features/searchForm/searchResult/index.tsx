import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import UserRole from 'components/userRole'
import { atachRelationship } from 'algorithms/filterSearch'
import Loading from 'screens/loading'

interface IProps {}

function ListResult(props: IProps) {
    const { current, loading, error } = useAppSelector((state) => state.search)
    const user = useAppSelector((state) => state.user.current)

    if (loading || error || !user) return <></>

    return (
        <>
            {current.map((stranger, index) => (
                <Box
                    mb={index === current.length - 1 ? 0 : 1}
                    p={1}
                    display="flex"
                    key={'searchResult' + index}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center" maxWidth="50%">
                        <Link to={`/${stranger.account}`} color="inherit">
                            <Avatar src={stranger.avatar} />
                        </Link>
                        <Typography
                            color="textPrimary"
                            component={Link}
                            sx={{ ml: 1 }}
                            to={`/${stranger.account}`}
                            noWrap
                            width="100%"
                        >
                            {stranger.username}
                        </Typography>
                    </Stack>
                    <UserRole friend={atachRelationship(stranger, user)} />
                </Box>
            ))}
        </>
    )
}
export default ListResult
