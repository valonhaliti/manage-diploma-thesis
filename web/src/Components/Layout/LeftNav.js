import React, { Component } from 'react'; 
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/AddCircle';
import PendingThesesIcon from '@material-ui/icons/ThumbsUpDown';
import ApprovedTheses from '@material-ui/icons/DoneOutline';
import InfoIcon from '@material-ui/icons/Info'


const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class LeftNav extends Component {  
  render() {
    const { classes } = this.props;
    return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem component={Link} to="/ngarko" button key="add-new-thesis">        
              <ListItemIcon> <AddIcon color="primary" /> </ListItemIcon>
              <ListItemText primary="Ngarko temën" />              
            </ListItem>
            <Divider />
            <ListItem button key="pending-thesis" component={Link} to="/theses"> 
              <ListItemIcon> <InfoIcon /> </ListItemIcon>
              <ListItemText primary="Temat e fundit" />              
            </ListItem>
            <ListItem button key="pending-thesis"> 
              <ListItemIcon> <PendingThesesIcon /> </ListItemIcon>
              <ListItemText primary="Temat në shqyrtim" />              
            </ListItem>
            <ListItem button key="approved-thesis"> 
              <ListItemIcon> <ApprovedTheses /> </ListItemIcon>
              <ListItemText primary="Temat e aprovuara" />              
            </ListItem>
          
          </List>
        </Drawer>
    );
  }
}


LeftNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftNav);