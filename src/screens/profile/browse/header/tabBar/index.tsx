import { AppBar, Tab, Tabs } from '@mui/material'
import Loading from 'screens/loading'
import { IHeaderProps } from '..'
import { useStyle } from './styles'

const TabBar = ({ setIndex, index, user }: IHeaderProps) => {
    const style = useStyle()
    if (!user) return <Loading />

    return (
        <AppBar position="static" color="default" className={style.appbar}>
            <Tabs
                value={index}
                onChange={(event, newIdx) => setIndex(newIdx)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Posts" className={style.item} />
                <Tab label="Photos" className={style.item} />
                <Tab
                    label={`Friends (${user.friends.accepted.length})`}
                    className={style.item}
                />
            </Tabs>
        </AppBar>
    )
}

export default TabBar
