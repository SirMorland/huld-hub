import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #00173A 50%, #ffffff 50%)',
    height: '100vh',
  },
});

export default function PageWrapper({ children }) {
  const { body } = useStyles();
  return <Container maxWidth={false} component="main" className={body} >
    {children}
  </Container>
}

