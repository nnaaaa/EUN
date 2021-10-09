import { Avatar, Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'states/hooks'
import Images from './assets'
import { useStyle } from './gutterStyles'



export default function Profile() {
  const style = useStyle()
  const user = useAppSelector(state => state.user.current)

  
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Link to={`/profile`} style={{width: '100%'}}>
        <Button startIcon={<Avatar src={user && user.avatar} />} className={style.button}>
          <Typography className={style.text}>{user && user.username}</Typography>
        </Button>
      </Link>
      <Button startIcon={<Avatar src={Images.group} />} className={style.button}>
        <Typography className={style.text}>Friends</Typography>
      </Button>
      <Button startIcon={<Avatar src={Images.save} />} className={style.button}>
        <Typography className={style.text}>Save</Typography>
      </Button>
      <Button startIcon={<Avatar src={Images.event} />} className={style.button}>
        <Typography className={style.text}>Event</Typography>
      </Button>
      <Button startIcon={<Avatar src={Images.clock} />} className={style.button}>
        <Typography className={style.text}>Memories</Typography>
      </Button>
    </Box>
  )
}
