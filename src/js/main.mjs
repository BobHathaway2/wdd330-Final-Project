// let data = await fetch ("http://www.ndbc.noaa.gov/data/realtime2/", {mode: "no-cors"});
// console.log(data);

export default class GetData {
    static #url = "https://www.ndbc.noaa.gov/data/realtime2/51201.txt";

    static retrieve = (swell, period) => {
        $.ajax({
            type: 'GET',
            url: this.#url,
            dataType: 'jsonp',
            success: [ function (data) {
                console.log(data);
            }],
            error: function () {
                console.log("error");
            },
        });
    }
}
