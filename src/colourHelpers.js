import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// -------------------------------------------------------------- This function is used to generate the different shades of a colour stored on the palette ------------------------------------
function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };

    //create a new colors object that sets each level to an empty array
    for(let level of levels) {
        newPalette.colors[level] = [];
    }

    for(let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        for(let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
            })
        }
    }

    return newPalette;
}

function getRange(hexColor) {
    const end = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ];
}

function generateScale(hexColor, numberOfColors) {
   return chroma
            .scale(getRange(hexColor))
            .mode('lab')
            .colors(numberOfColors);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export { generatePalette }