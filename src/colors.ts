type ColorMap = { [key: string]: string };
type Colors = 'reset' | 'red' | 'green' | 'yellow';
type Styles = 'bold' | 'underline' | 'reverse' | 'dim';

export class Color {
    /**
     * Colors to use in the command line.
     *
     * @var object
     */
    protected static _colors: ColorMap = {
        reset: '\x1b[0m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
    };

    /**
     * Command line styles to be used
     *
     * @var object
     */
    protected static _style: ColorMap = {
        bold: '\x1b[1m',
        underline: '\x1b[4m',
        reverse: '\x1b[7m',
        dim: '\x1b[2m',
    };

    /**
     * Returns a color pattern styled accordingly. Returns a string in the
     * format \x1b[1m\x1b[31m%s\x1b[0m for a bold text line.
     *
     * @param text
     * @param color
     * @param style
     */
    public static pattern(color: Colors, ...style: Styles[]) {
        let pattern = '';

        style.forEach((style) => {
            pattern += this._style[style] || '';
        });

        pattern += this._colors[color] || '';

        return pattern + '%s' + this._colors['reset'];
    }
}
