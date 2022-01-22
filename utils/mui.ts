import { createStyles, makeStyles, Theme } from '@mui/material'

// Etc
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',

      '& .MuiFormControl-root': {
        margin: '1px 0',
      },

      '& .MuiChip-root': {
        backgroundColor: '#999999',
        fontSize: '15px',
      },

      '& .MuiIconButton-root': {
        color: '#dddddd',
      },

      '& .MuiInput-root': {
        color: '#eeeeee',
      },

      '& .MuiFormLabel-root': {
        fontSize: '17px',
        color: '#dddddd',
      },
    },
  })
)
