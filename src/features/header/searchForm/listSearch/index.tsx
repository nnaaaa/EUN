import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IUser } from 'models/user'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import UserRole from './userRole'

interface IProps {
    list: IUser[]
}

function ListResult(props: IProps) {
    return (
        <>
            {props.list.map((user, index) => (
                <Box
                    mb={index === props.list.length - 1 ? 0 : 1}
                    display="flex"
                    key={index}
                    alignItems="center"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Box display="flex">
                        <Link to={`/friend/${user.account}`} color="inherit">
                            <Avatar src={user.avatar} />
                        </Link>
                        <Typography
                            color="textPrimary"
                            component={Link}
                            to={`/friend/${user.account}`}
                        >
                            {user.username}
                        </Typography>
                    </Box>
                    <UserRole {...user}/>
                </Box>
            ))}
        </>
    )
}
export default ListResult
