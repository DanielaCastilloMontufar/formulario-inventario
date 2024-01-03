import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography } from '@mui/material';


const SummaryTile = ({ title, subTitle, icon }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </CardContent>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="caption">{subTitle}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

SummaryTile.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subTitle: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export default SummaryTile;
