import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import UserRole from 'components/userRole'

interface IProps {}

function ListResult(props: IProps) {
    const { current, loading, error } = useAppSelector((state) => state.search)

    if (loading || error) return <></>

    return (
        <>
            {current.map((user, index) => (
                <Box
                    mb={index === current.length - 1 ? 0 : 1}
                    p={1}
                    display="flex"
                    key={'searchResult' + index}
                    alignItems="center"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center">
                        <Link to={`/friend/${user.account}`} color="inherit">
                            <Avatar src={user.avatar} />
                        </Link>
                        <Typography
                            color="textPrimary"
                            component={Link}
                            sx={{ ml: 1 }}
                            to={`/friend/${user.account}`}
                        >
                            {user.username}
                        </Typography>
                    </Stack>
                    <UserRole user={user} />
                </Box>
            ))}
        </>
    )
}
export default ListResult
