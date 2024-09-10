import { Box, Typography, Card, CardMedia, Button, CardActions } from '@mui/material';
import { DEFAULT_IMG } from '../helpers/const';

const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    bgcolor: 'rgba(0, 0, 0, 0.54)',
    color: 'white',
    padding: '10px',
};

const cardStyle = {
    maxWidth: 345,
};

const PosterCard = ({ quote }) => {

    return (
    <Card sx={cardStyle}>
        <Box sx={{ position: 'relative' }}>
            <CardMedia component="img" height="200" image={quote.mediaUrl || DEFAULT_IMG} />
            <Box sx={overlayStyle}>
                <Typography variant="h6">{quote.text}</Typography>
            </Box>
        </Box>
        <CardActions>
            <Button size="small">{quote.id} | {quote.username}</Button>
            <Button size="small">{new Date(quote.createdAt).toLocaleDateString()}</Button>
        </CardActions>
    </Card>
    )
}

export default PosterCard;