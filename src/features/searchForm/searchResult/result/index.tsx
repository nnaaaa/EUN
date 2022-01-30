import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { attachRelationship } from 'algorithms/filterSearch'
import UserRole from 'components/userRole'
import { IPublicInfo } from 'models/user'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface IResultProps{
    stranger:IPublicInfo
    user:IPublicInfo
}

function Result({ stranger, user }: IResultProps) {
    const strangerWithRole = useMemo(() => {
        return attachRelationship(stranger,user)
    },[stranger,user])

    return (
        <Box
            mb={1}
            p={1}
            display="flex"
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
                    to={`/user/${stranger._id}`}
                    noWrap
                    width="100%"
                >
                    {stranger.username}
                </Typography>
            </Stack>
            <UserRole friend={strangerWithRole} />
        </Box>
    )
}

export default Result
