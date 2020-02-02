const predef = require("./tools/predef");
const meta = require("./tools/meta");
const SMA = require("./tools/SMA");
const EMA = require("./tools/EMA");
const WMA = require("./tools/WMA");

class maHistogram {
    init() {
        switch(this.props.period1type) {
          case "Simple":
              this.period1Avg = SMA(this.props.period1);
              break;
          case "Exponential":
              this.period1Avg = EMA(this.props.period1);
              break;
          case "Weighted":
              this.period1Avg = WMA(this.props.period1);
              break;
          default:
              this.period1Avg = SMA(this.props.period1);
        }
        switch(this.props.period2type) {
          case "Simple":
              this.period2Avg = SMA(this.props.period2);
              break;
          case "Exponential":
              this.period2Avg = EMA(this.props.period2);
              break;
          case "Weighted":
              this.period2Avg = WMA(this.props.period2);
              break;
          default:
              this.period2Avg = SMA(this.props.period2);
        }
    }

    map(d) {
        const value = d.value();
        const diff = this.period1Avg(value) - this.period2Avg(value);
        const plotValue = (diff > 0) ? 100 : 99.9999;
        const plotColor = { color: diff > 0 ? "green" : "red" };
        return {
            value: plotValue,
            style: { value: plotColor }
        };
    }
}

module.exports = {
    name: "maHistogram",
    description: "maHistogram",
    calculator: maHistogram,
    params: {
        period1: predef.paramSpecs.period(8),
        period1type: predef.paramSpecs.enum({value1: "Simple", value2: "Exponential", value3: "Weighted"}),
        period2: predef.paramSpecs.period(35),
        period2type: predef.paramSpecs.enum({value1: "Simple", value2: "Exponential", value3: "Weighted"})
    },
    tags: [predef.tags.MovingAverage],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots: {
        value: { displayOnly: true }
    },
    plotter: predef.plotters.histogram
};
