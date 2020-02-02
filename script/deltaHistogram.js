const predef = require("./tools/predef");
const meta = require("./tools/meta");

class deltaHistogram {
    map(d) {
        const deltaValue = d.offerVolume() - d.bidVolume();
        const deltaColor = { color: deltaValue > 0 ? "green" : "red" };
        return {
            value: deltaValue,
            style: { value: deltaColor }
        };
    }
}


module.exports = {
    name: "Delta",
    description: "Delta Histogram",
    calculator: deltaHistogram,
    tags: [predef.tags.Volumes],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plotter: predef.plotters.histogram
};