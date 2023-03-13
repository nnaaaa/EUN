import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import clsx from 'clsx';
import { INameEntity } from 'models';
import React from 'react';
import { useStyles } from './styles';

interface ISplitContentInteractionProps {
    aggregateEntities: INameEntity[]
    selectedEntities: string[]
    setSelectedEntities: React.Dispatch<React.SetStateAction<string[]>>
    mappedEntities: string[]
}

const SplitContentInteraction = ({ aggregateEntities, mappedEntities, selectedEntities, setSelectedEntities }: ISplitContentInteractionProps) => {
    const styles = useStyles()
    const [isOpen, setIsOpen] = React.useState(false)
    const filterLabel = `Filter ${selectedEntities.length}/${mappedEntities.length}`


    const handleFilterEntities = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target
        setSelectedEntities(value as string[])
    }

    return (
        <>
            {/* <Button variant="contained" onClick={() => setIsOpen(true)}>
                Do something
            </Button>
            <Dialog disableEscapeKeyDown open={isOpen} onClose={() => setIsOpen(false)}> */}
            {/* <DialogTitle>Fill the form</DialogTitle> */}
            <Box display="flex">
                <FormControl className={styles.wrapperInteractionLabel} size="small">
                    <InputLabel id="filter-entities" className={styles.contentInteractionLabel}>{filterLabel}</InputLabel>
                    <Select<string[]>
                        labelId="filter-entities"
                        variant='standard'
                        multiple
                        value={selectedEntities}
                        onChange={handleFilterEntities}
                        input={<OutlinedInput label={filterLabel}/>}
                        renderValue={(selected) => (
                            <Box>
                                <Typography component="code">{selectedEntities.length}</Typography> Entities
                            </Box>
                            // <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            //     {(selected as string[]).map((entity) => (
                            //         <Chip key={entity} label={entity} className={(styles as any)[entity]}/>
                            //     ))}
                            // </Box>
                        )}
                    // MenuProps={MenuProps}
                    >
                        {mappedEntities.map((entity) => (
                            <MenuItem
                                key={entity}
                                value={entity}

                            // style={getStyles(name, personName, theme)}
                            >
                                <Typography className={clsx(styles.entityName, (styles as any)[`${entity}_idEntityName`])}>
                                    {entity}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

               
            </Box>
            {/* </Dialog> */}
        </>
    )
}

export default SplitContentInteraction