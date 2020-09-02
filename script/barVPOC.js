/*

Description
Volume point of control(VPOC), refers to the price at which the highest volume of trading occurred.
This indicator will calculate VPOC in real time for each bar


Parameter
boxColor: The color of the box around VPOC
boxWidth: Depends on your chart type, box width is adjustable for best view
lineOpacity: The transparency of lines
lineWidth: The thickness of lines

Plot
Rectangle box around VPOC for each bid/ask bar


*/


const predef = require("./tools/predef");
const meta = require("./tools/meta");
const p = require("./tools/plotting");


class barVPOC {

    map(d) {
        const profile = d.profile();
        const VPOC = profile.reduce((result, value) => {
            if (value.vol > result.vol) {
                result = value;
            }
            return result;
        }, { vol: 0 });
        return {
            VPOC: VPOC.price,
            tickSize: this.contractInfo.tickSize
        };
    }
}

function boxPlotter(canvas, indicatorInstance, history) {

    const props = indicatorInstance.props;

    for(let i = 1; i < history.data.length; i++) {

        const item = history.get(i);
        const next = history.get(i + 1);

        let left = p.x.between(
            p.x.get(history.get(i - 1)),
            p.x.get(history.get(i)),
            0.50);

        let right = p.x.between(
            p.x.get(history.get(i - 1)),
            p.x.get(history.get(i)),
            1.50);

        // The perimeter path
        const path = p.createPath();
        path.moveTo(left, item.VPOC + item.tickSize/props.boxWidth);
        path.lineTo(left, item.VPOC - item.tickSize/props.boxWidth);
        path.lineTo(right, item.VPOC - item.tickSize/props.boxWidth);
        path.lineTo(right, item.VPOC + item.tickSize/props.boxWidth);
        path.lineTo(left, item.VPOC + item.tickSize/props.boxWidth);

        // Draw the perimeter
        canvas.drawPath(
            path.end(),
            {
                color: props.boxColor,
                width: props.lineWidth,
                opacity: props.lineOpacity / 100.0
            });

    }

}

module.exports = {
    name: "barVPOC",
    description: "VPOC (BAR)",
    calculator: barVPOC,
    tags: [predef.tags.Volumes],
    inputType: meta.InputType.BARS,
    params: {
        boxColor: predef.paramSpecs.color("#FFFF99"),
        boxWidth: predef.paramSpecs.percent(4, 1, 0, 10),
        lineOpacity: predef.paramSpecs.number(100, 1, 0),
        lineWidth: predef.paramSpecs.number(1, 1, 0)
    },
    plotter: [
        predef.plotters.custom(boxPlotter)
    ]
};