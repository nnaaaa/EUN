import { Avatar, Box, Stack, Tab, Tabs, Typography, IconButton } from '@mui/material'
import Popup from 'components/popup'
import { IReact } from 'models/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'
import { IPublicInfo } from 'models/user'
import { useAppSelector } from 'states/hooks'
import UserRole from 'components/userRole'
import { attachRelationship } from 'algorithms/filterSearch'
import CloseIcon from '@mui/icons-material/Close'
interface ITableDisplayProps {
    counter: {
        [key: string]: IReact[]
    }
    open: boolean
    onClose: () => void
}

function TableDisplay({ counter, open, onClose }: ITableDisplayProps) {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)
    const emoji = Object.values(counter)
    const [index, setIndex] = useState(0)

    if (!user || !emoji) return <></>

    return (
        <Popup open={open} onClose={onClose}>
            <Box width={590} height={400} bgcolor="white" boxShadow={1} borderRadius={2}>
                <Box>
                    <Tabs
                        value={index}
                        onChange={(event, newIdx) => setIndex(newIdx)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        sx={{ width: '540px', display: 'inline-flex' }}
                    >
                        {emoji.map((reactList) => (
                            <Tab
                                sx={{ p: 0, maxWidth: '90px' }}
                                key={reactList.toString()}
                                label={
                                    <div>
                                        {reactList[0].icon} {reactList.length}
                                    </div>
                                }
                            />
                        ))}
                    </Tabs>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {emoji[index] ? (
                    emoji[index].map((react) => {
                        const owner = react.owner as IPublicInfo

                        return (
                            <Box className={style.wrapper} key={react.toString()}>
                                <Stack direction="row" alignItems="center" maxWidth="70%">
                                    <Avatar
                                        src={owner.avatar}
                                        component={Link}
                                        to={`/user/${owner._id}`}
                                    />
                                    <Box ml={1} overflow="hidden">
                                        <Typography
                                            className={style.name}
                                            align="left"
                                            noWrap
                                            component={Link}
                                            to={`/user/${owner._id}`}
                                        >
                                            {owner.username}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <UserRole friend={attachRelationship(owner, user)} />
                            </Box>
                        )
                    })
                ) : (
                    <></>
                )}
            </Box>
        </Popup>
    )
}

export default TableDisplay
