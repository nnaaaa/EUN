import {Box, Typography, Avatar, Tooltip} from '@material-ui/core'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {css} from './commentStyles'

export default function Comment({avatar, name, content, createAt, uid}) {
  const style = css()
  const timeDetail = moment(createAt.toDate()).fromNow()
  const styleReact = [...style.button, ...style.hover]
  const styleName = [...style.name, ...style.hover]
  return (
    <Box display="flex">
      <Avatar src={avatar} />
      <Box ml={1}>
        <Box p={1} bgcolor="#F0F2F5" borderRadius={10}>
          <Link to={`friend/${uid}`}>
            <Typography className={style.name}>{name}</Typography>
          </Link>
          <Tooltip title={timeDetail} placement="right">
            <Typography className={style.content}>{content}</Typography>
          </Tooltip>
        </Box>
        <Box p={1} pt={0} display="flex">
          <Typography className={style.button}>Like</Typography>
          <Typography className={style.button}>Reply</Typography>
        </Box>
      </Box>
    </Box>
  )
}
