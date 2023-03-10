import { Box } from '@mui/material'

export const Branch = () => {
    return (
        <Box
            sx={{
                width: '24px',
                height: '24px',
                marginRight: '8px',
                borderBottomStyle: 'solid',
                borderBottomWidth: '2px',
                borderBottomColor: 'primary.main',
                borderLeftStyle: 'solid',
                borderLeftWidth: '2px',
                borderLeftColor: 'primary.main',
                borderBottomLeftRadius: '10px',
                marginLeft: '16px',
            }}
        />
    )
}

export const Trunk = () => {
    return (
        <Box
            sx={{
                left: '16px',
                position: 'absolute',
                width: '2px',
                backgroundColor: 'primary.main',
                top: '16px',
                height: 'calc(100% - 16px)',
            }}
        />
    )
}

export const TopTrunk = () => {
    return (
        <Box
            sx={{
                ml: '16px',
                width: '2px',
                backgroundColor: 'primary.main',
                height: 'calc(100% - 48px)',
            }}
        />
    )
}

export const Tree = () => (
    <>
        <Trunk />
        <Branch />
    </>
)
