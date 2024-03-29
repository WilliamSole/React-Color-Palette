import React, { PureComponent } from 'react';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/styles';


class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    handleClick() {
        this.props.gotToPalette(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const MiniColorBoxes = colors.map(color => (
            <div key={color.name} className={classes.miniColor} style={{ backgroundColor: color.color }}></div>
        ));

        return (
            <div className={classes.root} onClick={ this.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{ transition: 'all 0.3s ease-in-out' }}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {MiniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);