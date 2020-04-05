const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.html?label=gen173nr-1FCAEoggI46AdIM1gEaJYCiAEBmAExuAEHyAEM2AEB6AEB-AECiAIBqAIDuALXtaX0BcACAQ&sid=0622f18d679580aeba89608f7ddabdcb&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaJYCiAEBmAExuAEHyAEM2AEB6AEB-AECiAIBqAIDuALXtaX0BcACAQ%3Bsid%3D0622f18d679580aeba89608f7ddabdcb%3Bsb_price_type%3Dtotal%26%3B&ss=Chicago%2C+Illinois%2C+United+States&is_ski_area=0&checkin_year=2020&checkin_month=5&checkin_monthday=10&checkout_year=2020&checkout_month=5&checkout_monthday=30&group_adults=1&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=Chicago&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=20033173&dest_type=city&iata=CHI&place_id_lat=41.882099&place_id_lon=-87.624298&search_pageview_id=0ccd1dabcaf700d3&search_selected=true';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if(hotelelement.querySelector('strong.price')){
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception){

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})();