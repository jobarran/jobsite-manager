import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface Props {
    openDeleteConfirmationDialog: {status:boolean, id: string},
    setOpenDeleteConfirmationDialog: any,
    handleDeleteEmployee: () => void
    name: string,
    lastName: string,
}

export const EmployeeDeleteConfirmationModal:FC<Props> = ({name, lastName, handleDeleteEmployee, openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog}) => {

  
    const handleClose = () => {
        setOpenDeleteConfirmationDialog({status: false, id: ''});
    };
  
    return (

        <Dialog
          open={openDeleteConfirmationDialog.status}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle color={'error'} id="alert-dialog-title">
            <Stack direction="row" alignItems="center" gap={1}>
                <WarningAmberIcon />
                <Typography variant='h6'>Are you sure you want to delete {name} {lastName}?</Typography>
            </Stack>

          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you have done this, you won&apos;t be able to go back
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' color='error' onClick={handleDeleteEmployee} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    );

}
