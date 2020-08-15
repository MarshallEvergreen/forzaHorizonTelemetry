import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Spring from '@material-ui/icons/ViewHeadline';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from "@material-ui/core/Grid";
import LineChart from "./lineChart";
import RPM from "./rpm";
import TyreTemperature from "./tyreTempChart";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100%'
    },
    tabPanel: {
        flexGrow: 1,
        width: '100%'
    },
    gridContainer: {
        height: '100%'
    }
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                variant="scrollable"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Suspension Travel" icon={<Spring/>} {...a11yProps(0)} />
                <Tab label="Engine" icon={<DriveEtaIcon/>}{...a11yProps(1)} />
            </Tabs>
            <TabPanel className={classes.tabPanel} value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <LineChart telemetry="norm_suspension_travel_FL"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart telemetry="norm_suspension_travel_FR"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart telemetry="norm_suspension_travel_RL"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart telemetry="norm_suspension_travel_RR"/>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={value} index={1}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <RPM/>
                    </Grid>
                    <Grid item xs={6}>
                        <TyreTemperature/>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    );
}