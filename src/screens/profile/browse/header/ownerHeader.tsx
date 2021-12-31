import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Button,
    Typography
} from '@mui/material'
import Popup from 'components/popup'
import { useState } from 'react'
import Header from './'
// import EditProfile from 'features/editProfile/editProfile'
import { useStyle } from './styles'

export default class OwnerHeader extends Header {
    protected UserTool() {
        return <UserToolFunc/>
    }
}

const UserToolFunc = () => {
    const style = useStyle()
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <Button
                startIcon={<FontAwesomeIcon icon={faPen} size="xs" />}
                variant="contained"
                onClick={() => setToggle(true)}
            >
                <Typography className={style.item}>Edit Profile</Typography>
            </Button>
            <Popup open={toggle} onClose={() => setToggle(false)}>
                {/* <EditProfile setToggle={setToggle} /> */}
            </Popup>
        </>
    )
}
