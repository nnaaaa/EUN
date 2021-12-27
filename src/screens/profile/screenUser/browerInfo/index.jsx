import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button, Typography, AppBar, Tabs, Tab, Grid, Avatar} from '@material-ui/core'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'components/popup'
import EditProfile from 'features/editProfile/editProfile'
import {css, Box} from './styles'

export default function BrowserInfo({index, setIndex, user}) {
  const style = css()
  const [toggle, setToggle] = useState()
  const {avatar, name, uid, friends} = user

  return (
    <Box width="100%">
      <div className={style.coverPhoto}>
        <div className={style.avatar}>
          <Avatar src={avatar} className={style.avatarInside} />
        </div>
        <Link to="/">
          <FontAwesomeIcon icon={faFacebook} className={style.logo} />
        </Link>
      </div>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{margin: '30px 0', fontWeight: 'bold'}}
      >
        {name}
      </Typography>
      <Box px={10} lg={{px: 30}} className={style.nav}>
        <Grid container direction="row-reverse">
          <Grid container item md={6} justify="flex-end" alignItems="center">
            <Button
              startIcon={<FontAwesomeIcon icon={faPen} size="xs" />}
              variant="contained"
              onClick={() => setToggle(true)}
            >
              <Typography className={style.item}>Edit Profile</Typography>
            </Button>
            <Popup open={toggle} onClose={() => setToggle(false)}>
              <EditProfile setToggle={setToggle} />
            </Popup>
          </Grid>
          <Grid container item md={6}>
            <AppBar position="static" color="default" className={style.appbar}>
              <Tabs
                value={index}
                onChange={(event, newIdx) => setIndex(newIdx)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Posts" className={style.item} />
                <Tab label="Photos" className={style.item} />
                <Tab label={`Friends (${friends?.length})`} className={style.item} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
