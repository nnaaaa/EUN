import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import iconImage from './assets/icon.webp'

const useStyle = makeStyles({
    media: {
        height: 0,
        paddingTop: '60%',
    },
    smallMedia: {
        height: 0,
        paddingTop: '40%',
    },
})

interface ICardProps {
    onClick: () => void
}

export const BattleShipCard = ({ onClick }: ICardProps) => {
    const style = useStyle()
    return (
        <Card>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    image={iconImage}
                    title="battle-ship-icon"
                    className={style.media}
                />
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }}>Battle Ship</Typography>
                    <Typography variant="caption" color="textSecondary">
                        multiplayer, online
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={onClick}
                >
                    Play
                </Button>
            </CardActions>
        </Card>
    )
}

export const BattleShipSmallCard = ({ onClick }: ICardProps) => {
    return (
        <Card>
            <CardActionArea onClick={onClick}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 16,
                        background: `url(${iconImage}) center center no-repeat`,
                    }}
                >
                    <Typography style={{ fontWeight: 'bold', color: 'white' }}>
                        Battle Ship
                    </Typography>
                    <Typography variant="caption" style={{ color: 'white' }}>
                        multiplayer, online
                    </Typography>
                </div>
            </CardActionArea>
        </Card>
    )
}
