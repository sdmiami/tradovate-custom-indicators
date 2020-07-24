# tradovate-custom-indicators
Tradovate  offers a robust custom indicator solution that allows users to create/add indicators using JavaScript coding language.  In addition, Tradovate offers a complete open-source library to all Tradovate indicators with the ability to save and modify any current indicators, create your own from scratch, or upload an indicator in JavaScript. [More](https://tradovate.zendesk.com/hc/en-us/articles/115011665727-How-do-I-use-custom-indicators-in-Tradovate-)

## Delta Histogram
Tradovate has nice feature to view footprint chart(bid-ask volume), but currently lag features like bar delta and few more things. So I have created delta histogram indicator community can use this for now until we get that feature in chart itself. [More](https://tradovate.zendesk.com/hc/en-us/community/posts/360000855987-Order-Flow-2-0?page=1)

##### How to install
Indicator -> Explore Community Indicator  
![](img/delta_histogram_community_share.png)

After successfully installation the indicator is located at under Volume-based --> Delta Histogram
 
##### Example
![](img/delta_histogram.png)

## MA Histogram
Moving average histogram indicator will plot histogram and changes color when they cross each other, base upon your strategies if correct parameter were set, this can tell you when trend is changing.  

##### How to install
Indicator -> Explore Community Indicator  
![](img/ma_histogram_community_share.png)

After successfully installation the indicator is located at under Moving Averages --> MA Histogram
 
##### Example
![](img/ma_histogram.png)

## On Balance Volume & On Balance Volume Modified
##### [On Balance Volume](https://tlc.thinkorswim.com/center/reference/Tech-Indicators/studies-library/O-Q/OnBalanceVolume)
On Balance Volume keeps a running total of volume flowing into or out of a security. When the security closes higher than the previous close, all of the day's volume is considered up-volume. A close lower than the previous day's results in all of the day's volume considered down-volume. A rising OBV is defined as a sign of smart money flowing into a security. As the public then moves into the security, both the security and the OBV will surge ahead. If the price movement precedes the OBV movement, it is called a "non-confirmation." Non-confirmations tend to occur at bull market tops or at bear market bottoms.

When the security's price closes up, the day's OBV is created by adding the day's volume to the cumulative total. The day's volume is subtracted from the cumulative total when the price closes down.

##### [On Balance Volume Modified](https://tlc.thinkorswim.com/center/reference/Tech-Indicators/studies-library/O-Q/OnBalanceVolumeModified)
The OnBalanceVolumeModified (OBVM) study is a technical indicator introduced by Vitali Apirine. It is a variation of OnBalanceVolume (OBV). In the modified version, OBV is given a smoothing (by an exponential moving average, by default). In addition, a signal line is introduced. The signal line is a slower moving average of the smoothed-out OBV.  

When the main line of the OBVM is rising, the volume might be gaining positive pressure, which may further result in an increase of the price. Conversely, decreasing OBVM may signify decreasing volume pressure and a further price reduction. 

The main line can also be analyzed in terms of divergences from the main price plot. The signal line can be used to identify crossovers.

##### How to install
Indicator -> Explore Community Indicator  
![](img/on_balance_volume_community_share.png)

After successfully installation the indicator is located at under Volume-based --> On Balance Volume/On Balance Volume Modified

##### Example
![](img/on_balance_volume.png)