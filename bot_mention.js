// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
 * An HTTP endpoint that acts as a webhook for Discord message.create event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {


let result = {crawler: {}};

console.log(`Running [Crawler → Query (scrape) a provided URL based on CSS selectors]...`);
result.crawler.pageData = await lib.crawler.query['@0.0.1'].selectors({
  url: `https://localhackday.mlh.io/`,
  userAgent: `stdlib/crawler/query`,
  includeMetadata: false,
  selectorQueries: [
    {
      'selector': `.learn-sect-3-indi .w-dyn-items`,
      'resolver': `text`
    }
  ]
});

let requested_date = 0

const pretty_dates = ["Sunday March 28th", "Monday March 29th", "Tuesday March 30th", "Wednesday March 31st", "Thursday April 1st", "Friday April 2nd", "Saturday April 3rd", "Sunday April 4th"]
if(event.content.includes("March 28")) {
  requested_date = 0
} else if(event.content.includes("March 29")) {
  requeted_date = 1
} else if(event.content.includes("March 30")) {
  requested_date = 2
} else if(event.content.includes("March 31")) {
  requested_date = 4
} else if(event.content.includes("April 1")) {
  requested_date = 5
} else if(event.content.includes("April 2")) {
  requested_date = 6
} else if(event.content.includes("April 3")) {
  requested_date = 7
} else if(event.content.includes("April 4")) {
  requested_date = 8
} else if(event.content.includes("April 5")) {
  requested_date = 9
} else {
  requested_date = 0
}

console.log(result.crawler.pageData.queryResults[0])
let that_days_events = result.crawler.pageData.queryResults[0][requested_date].text.replace(/ET/g, " ET - ")
let split_events = that_days_events.split(/(\d{1,2}:\d{2} [^0-9]+)/g)
split_events.unshift(`** :star2::shark: Upcoming events on ${pretty_dates[requested_date]} :shark::star2:**`)

let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
  channel_id: `${event.channel_id}`,
  content: split_events.join('\n')
});

return messageResponse;

}
