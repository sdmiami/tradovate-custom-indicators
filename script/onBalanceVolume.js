/*

Description
On Balance Volume keeps a running total of volume flowing into or out of a security. 
When the security closes higher than the previous close, all of the day's volume is considered up-volume. 
A close lower than the previous day's results in all of the day's volume considered down-volume. 
A rising OBV is defined as a sign of smart money flowing into a security. As the public then moves into the security, both the security and the OBV will surge ahead.
If the price movement precedes the OBV movement, it is called a "non-confirmation." Non-confirmations tend to occur at bull market tops or at bear market bottoms.

When the security's price closes up, the day's OBV is created by adding the day's volume to the cumulative total. 
The day's volume is subtracted from the cumulative total when the price closes down.

Plots
OBV :->	The On Balance Volume line.

*/


const predef = require("./tools/predef")
const meta = require('./tools/meta')


class onBalanceVolume {
    
    init() {
        
        this.obv = 0
        
    }

    map(d, i, history) {
        
        const volume = d.volume()
        const close = d.close()
        const priorClose = i > 0 ? history.prior().close() : close
        
        if (close > priorClose) {
            this.obv += volume
        }else if (close < priorClose){
            this.obv += (-1 * volume)
        }else{
            this.obv += (0 * volume)
        }

        return this.obv
    }
}

module.exports = {
    name: "obv",
    description: "On Balance Volume",
    calculator: onBalanceVolume,
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    tags: [predef.tags.Volumes],
    schemeStyles: predef.styles.solidLine("white")
}