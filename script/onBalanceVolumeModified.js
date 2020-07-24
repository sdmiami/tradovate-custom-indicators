/*

Description
The OnBalanceVolumeModified (OBVM) study is a technical indicator introduced by Vitali Apirine. It is a variation of OnBalanceVolume (OBV). 
In the modified version, OBV is given a smoothing (by an exponential moving average, by default).
In addition, a signal line is introduced. The signal line is a slower moving average of the smoothed-out OBV.

When the main line of the OBVM is rising, the volume might be gaining positive pressure, which may further result in an increase of the price. 
Conversely, decreasing OBVM may signify decreasing volume pressure and a further price reduction. 

The main line can also be analyzed in terms of divergences from the main price plot. The signal line can be used to identify crossovers.

Input Parameters
obvmLength :->	The length of the moving average to smooth OnBalanceVolume with.
signal length :->	The length of the moving average used in the calculation of the signal line.
average type :->	The type of moving average to be used in calculations: simple, exponential(default), weighted.

Plots
OBVM :->	The main OnBalanceVolumeModified line.
Signal :->  The signal OnBalanceVolumeModified line.

*/


const predef = require("./tools/predef")
const meta = require('./tools/meta')
const plotting = require("./tools/plotting")
const SMA = require("./tools/SMA")
const EMA = require("./tools/EMA")
const WMA = require("./tools/WMA")

class onBalanceVolumeModified {
    
    init() {
        
        switch(this.props.averageType) {
          case "Simple":
              this.obvmAverage = SMA(this.props.obvmLength)
              this.signalAverage = SMA(this.props.signalLength)
              break;
          case "Exponential":
              this.obvmAverage = EMA(this.props.obvmLength)
              this.signalAverage = EMA(this.props.signalLength)
              break;
          case "Weighted":
              this.obvmAverage = WMA(this.props.obvmLength)
              this.signalAverage = WMA(this.props.signalLength)
              break;        
          default:
              this.obvmAverage = EMA(this.props.obvmLength)
              this.signalAverage = EMA(this.props.signalLength)
        }
        
        this.obv = 0
        this.obvm = 0
        this.signal = 0
        
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
        
        this.obvm = this.obvmAverage(this.obv)
        this.signal = this.signalAverage(this.obvm)
        
        return {
            obvm: this.obvm,
            signal: this.signal
        }
    }
}

module.exports = {
    name: "onBalanceVolumeModified",
    description: "On Balance Volume Modified",
    calculator: onBalanceVolumeModified,
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    tags: [predef.tags.Volumes],
    params: {
        obvmLength: predef.paramSpecs.period(7),
        signalLength: predef.paramSpecs.period(10),
        averageType: predef.paramSpecs.enum({value1: "Simple", value2: "Exponential", value3: "Weighted"}),

    },
    validate(obj) {
		if (obj.obvmLength < 1) {
			return meta.error("obvmLength", "OBVM length should be a positive number");
		}
		if (obj.signalLength < 1) {
			return meta.error("signalLength", "Signal length should be a positive number");
		}
		return undefined;
	},
    plots: {
        obvm: { title: "obvm" },
        signal: { title: "signal" }
    },
    plotter: [
        predef.plotters.singleline("obvm"),
        predef.plotters.singleline("signal")
    ],
    schemeStyles: {
        dark: {
            obvm: predef.styles.plot("#CC33FF"),
            signal: predef.styles.plot("#CC6600")
        }
    }
}