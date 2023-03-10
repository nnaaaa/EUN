import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { attachRelationship } from 'algorithms/filterSearch'
import UserRole from 'components/userRole'
import { IPublicInfo } from 'models/user'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface IResultProps {
    stranger: IPublicInfo
    user: IPublicInfo
}

function Result({ stranger, user }: IResultProps) {
    const strangerWithRole = useMemo(() => {
        return attachRelationship(stranger, user)
    }, [stranger, user])

    return (
        <Box
            mb={1}
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" maxWidth="50%">
                <Avatar
                    src={stranger.avatar}
                    component={Link}
                    to={`user/${stranger.account}`}
                />
                <Stack sx={{ ml: 1 }}>
                    <Typography
                        color="textPrimary"
                        fontWeight="bold"
                        component={Link}
                        to={`/user/${stranger.account}`}
                        noWrap
                        width="100%"
                    >
                        {stranger.username}
                    </Typography>
                    <Typography color="textSecondary" noWrap width="100%">
                        {stranger.account}
                    </Typography>
                </Stack>
            </Stack>
            <UserRole friend={strangerWithRole} />
        </Box>
    )
}

export default Result
