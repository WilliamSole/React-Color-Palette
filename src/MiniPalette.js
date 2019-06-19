import React from 'react';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/styles';


function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, handleClick } = props;
    const MiniColorBoxes = colors.map(color => (
        <div key={color.name} className={classes.miniColor} style={{ backgroundColor: color.color }}></div>
    ));

    return (
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon} style={{ transition: 'all 0.3s ease-in-out' }}/>
            </div>
            <div className={classes.colors}>
                {MiniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);