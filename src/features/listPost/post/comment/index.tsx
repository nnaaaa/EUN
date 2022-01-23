import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, IconButton, Popover, Tooltip, Typography } from '@mui/material'
import DisplayGridImages from 'components/images/output2'
import useToggle from 'hooks/useToggle'
import { IComment } from 'models/comment'
import { IPost } from 'models/post'
import { IPublicInfo } from 'models/user'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CRUDButtons from './crudButtons'
import EditComment from './crudComment/edit'
import { useStyle } from './styles'

interface ICommentProps {
    comment: IComment
    post: IPost
}

export default function Comment({ comment, post }: ICommentProps) {
    const style = useStyle()
    const [isEdit, setIsEdit] = useState(false)

    const { content, createAt, owner, images } = comment
    const { username, avatar } = owner as IPublicInfo
    const timeDetail = moment(createAt).fromNow()
    
    const { isHover, setIsHover, setIsToggle, isToggle, toggleBtnRef } = useToggle()

    if (isEdit) return <EditComment post={post} initComment={comment} setIsEdit={setIsEdit}/>

    return (
        <Box display="flex" mb={1} alignItems="flex-start"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Avatar src={avatar} />
            <Box ml={1}>
                <Box p={1} bgcolor="#F0F2F5" borderRadius={2}>
                    <Typography
                        className={style.name}
                        component={Link}
                        to={`/user/${(owner as IPublicInfo)._id}`}
                    >
                        {username}
                    </Typography>
                    <Tooltip title={timeDetail} placement="right">
                        <Typography className={style.content}>{content}</Typography>
                    </Tooltip>

                    {images.length ? (
                        <Box mt={1}>
                            <DisplayGridImages images={images} title={username} />
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
            <IconButton
                sx={{
                    alignSelf: 'center',
                    ml: 1,
                    visibility: isHover ? 'initial' : 'hidden',
                }}
                color="primary"
                size="small"
                onClick={() => setIsToggle(true)}
                ref={toggleBtnRef}
            >
                <FontAwesomeIcon icon={faEllipsisH} />
            </IconButton>

            <Popover
                open={isToggle}
                anchorEl={toggleBtnRef.current}
                onClose={() => setIsToggle(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <CRUDButtons
                    comment={comment}
                    setOpenOption={setIsToggle}
                    setIsEdit={setIsEdit}
                />
            </Popover>
        </Box>
    )
}
