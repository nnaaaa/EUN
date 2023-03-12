import { Box, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { Android12Switch } from './styles';

interface ISwitcherProps {
    label: string
    defaultChecked?: boolean
    onClick?: () => void
}

const Switcher = ({ label, defaultChecked = false, onClick }: ISwitcherProps) => {
    return (
        <Box display="inline-flex" alignItems="center">
            <Android12Switch defaultChecked={defaultChecked} onClick={onClick}/>
            <Typography variant="body2">{label}</Typography>
        </Box>
    )
}

export default Switcher