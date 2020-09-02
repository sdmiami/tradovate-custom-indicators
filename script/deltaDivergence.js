/*

Description
Delta is a key concept to understand when making trading decisions based upon traded volume.
It’s the difference between the volume of market orders buying by lifting the offer price and the volume of market orders selling by hitting the bid price.
In other words, if Delta is greater than zero, we had more buying than selling and if Delta is less than zero, we had more selling than buying.

Delta gives us a broad sense for each bar of whether we have more aggressive buying or selling.
We can compare Delta between bars to get a sense of whether supply and demand are rising or falling,
Delta Divergence tells us when the delta across price bars is not moving in the same direction as price.

Example:
1. Bearish Divergence ==> Price has made a new high but there was more selling than buying.
2. Bullish Divergence ==> Price has made a new low but there was more buying than selling.

Plots
Red dot above the high when price makes higher high on negative delta
Green dot below the low when price makes lower low on positive delta

*/


const predef = require("./tools/predef");
const meta = require("./tools/meta");

class deltaDivergence {
    map(d, i, history) {
        let bearishDivergence;
        let bullishDivergence;
        const tickSize = this.contractInfo.tickSize;
        if(i > 0){
            const deltaValue = d.offerVolume() - d.bidVolume();
            const currentHigh = d.high();
            const currentLow = d.low();
            const prevDeltaValue = history.prior().offerVolume() - history.prior().bidVolume();
            const prevHigh = history.prior().high();
            const prevLow = history.prior().low();
            if (currentHigh >= prevHigh && deltaValue <= 0 && prevDeltaValue >= 0){
                bearishDivergence = d.high() + (tickSize * this.props.plotInTick);
            }
            if(currentLow <= prevLow && deltaValue >= 0 && prevDeltaValue <= 0){
                bullishDivergence = d.low() - (tickSize * this.props.plotInTick);
            }
        }

        return{
            bearishDivergence,
            bullishDivergence
        };
    }
}

module.exports = {
    name: "deltaDivergence",
    title: "Delta Divergence",
    description: "Delta Divergence",
    calculator: deltaDivergence,
    params: {
        plotInTick: predef.paramSpecs.number(2)
    },
    tags: [predef.tags.Volumes],
    inputType: meta.InputType.BARS,
    plotter: [
        predef.plotters.dots('bearishDivergence'),
        predef.plotters.dots('bullishDivergence')
    ],
    plots: {
        bearishDivergence: { title: 'Bearish Divergence', displayOnly: true },
        bullishDivergence: { title: 'Bullish Divergence', displayOnly: true }
    },
    schemeStyles: {
        dark: {
            bearishDivergence: {color: "red"},
            bullishDivergence: {color: "green"}
        }
    }
};