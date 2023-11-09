import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from 'react';

interface Props {
    data: string[],
    handleSearchInputChange: (event: string) => void,
    handleDataReset: (input: any) => void
}


export const DataGridQuickSearch:FC<Props> = ({data, handleSearchInputChange, handleDataReset }) => {


  return (

    <OutlinedInput
        onChange={ event => handleSearchInputChange(event.target.value)}
        value={data}
        sx={{mt:0.5, ml:0.5, width: '100%'}}
        size="small"
        id="outlined-adornment-password"
        type='text'
        endAdornment={
        <InputAdornment position="end">
            {
            data.length !== 0
            ? <IconButton edge='end' onClick={ () => handleDataReset([]) }><ClearIcon/></IconButton>
            : <IconButton edge='end' ><SearchIcon /></IconButton>
            }                          
        </InputAdornment>
        }
    />
    
  )
}
