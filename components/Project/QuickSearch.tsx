import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "&$focused $notchedOutline": {
      borderColor: "#2C4674",
      borderWidth: '1px'
    }
  },
  focused: {},
  notchedOutline: {}
}));

interface Props {
  searchValue: any,
  handleSearchChange: any,
  handleClearSearch: any,
  disabled: boolean
}

export const QuickSearch:FC<Props> = ({searchValue, handleSearchChange, handleClearSearch, disabled}) => {

  const outlinedInputClasses = useOutlinedInputStyles();


  return (
    <OutlinedInput
        disabled={disabled}
        classes={outlinedInputClasses}
        value={searchValue}
        onChange={handleSearchChange}
        sx={{ 
          height: 35, 
          width: '100%',      
        }}
        size="small"
        id="outlined-adornment-password"
        type='text'
        endAdornment={
        <InputAdornment position="end">
            {
            (searchValue)
            ? <IconButton edge='end' onClick={ handleClearSearch }><ClearIcon/></IconButton>
            : <IconButton edge='end' ><SearchIcon /></IconButton>
            }                          
        </InputAdornment>
        }
    />
  )
}
