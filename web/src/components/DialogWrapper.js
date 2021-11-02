import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  dialog: {
    boxShadow: '2px 4px 8px RGBA(0, 0, 0, 0.16) ',
    borderRadius: '5px',
    padding: '24px 16px',
    background: 'white',
    width: '512px',
    maxWidth: 'calc(100vw - 32px)'
  },
});

export default function DialogWrapper({ children }) {
  const { dialog } = useStyles();
  return <Box
    className={dialog}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
}

