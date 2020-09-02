/*

Description
Delta is a key concept to understand when making trading decisions based upon traded volume.
It’s the difference between the volume of market orders buying by lifting the offer price and the volume of market orders selling by hitting the bid price.
In other words, if Delta is greater than zero, we had more buying than selling and if Delta is less than zero, we had more selling than buying.

Delta gives us a broad sense for each bar of whether we have more aggressive buying or selling.

Plots
Delta candlestick on the chart & OHLC of delta on data box

Historical data doesn't contains sequence of the volumes, so you won't see high and low of delta for historical data.
It's going to show candlestick delta chart only if you have it open.

*/


const predef = require("./tools/predef");
const meta = require("./tools/meta");
const p = require("./tools/plotting");

let parentArray;

class deltaCandle {

    map(d, index) {

        if(index in parentArray){
            parentArray[index].push(d.offerVolume() - d.bidVolume())
        }else{
            parentArray[index]=[]
            parentArray[index].push(d.offerVolume() - d.bidVolume())
        }

        return {
            dOpen: 0,
            dHigh: Math.max(...parentArray[index]),
            dLow: Math.min(...parentArray[index]),
            dClose: parentArray[index][parentArray[index].length - 1],
            candlestick: {
                color: this.props.hideCandles ? "transparent" : null
            },
            style: {
                value: {
                    color: this.props.hideCandles ? "transparent" : null
                }
            },
        };
    }
}


function candlestickPlotter(canvas, indicatorInstance, history) {
  for(let i=0; i<history.data.length; ++i) {
    const item = history.get(i);
    if (item.dOpen !== undefined
            && item.dHigh !== undefined
            && item.dLow !== undefined
            && item.dClose !== undefined) {
        const x = p.x.get(item);

        // candle body
        canvas.drawLine(
            p.offset(x, item.dOpen),
            p.offset(x, item.dClose),
            {
                color: item.dOpen > item.dClose ? indicatorInstance.props.fallingColor : indicatorInstance.props.risingColor,
                relativeWidth: 0.5,
            });

        // candle wicks
        canvas.drawLine(
            p.offset(x, item.dHigh),
            p.offset(x, item.dLow),
            {
                color: item.dOpen > item.dClose ? indicatorInstance.props.fallingColor : indicatorInstance.props.risingColor,
                relativeWidth: 0.1,
            });
    }
  }
}

module.exports = {
    name: "deltaCandle",
    title: "Delta Candle",
    description: "Delta Candle",
    calculator: deltaCandle,
    tags: [predef.tags.Volumes],
    params: {
        hideCandles: predef.paramSpecs.bool(false),
        risingColor: predef.paramSpecs.color("green"),
        fallingColor: predef.paramSpecs.color("red")
    },
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots: {
        dOpen: { title: "Δ-Open" },
        dHigh: { title: "Δ-High" },
        dLow: { title: "Δ-Low" },
        dClose: { title: "Δ-Close" }
    },
    plotter: [
        predef.plotters.custom(candlestickPlotter)
    ]
};