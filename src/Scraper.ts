import * as q from 'q'
import * as rp from 'request-promise'
import * as cheerio from 'cheerio'
import * as  bluebird from 'bluebird'

export class Scraper {

    static getPages(opts) {
        var promisesArr = []
        for (var int = 0; int <= opts.howMany - 1; int++) {
            promisesArr.push(Scraper.rpCheerio(opts.getUrl(int)).then(opts.bodyParser))
        }
        return q.all(promisesArr)
    }

    static getPage(opts) {
        return Scraper.rpCheerio(opts.url).then(opts.bodyParser)
    }

    static rpCheerio(url) {
        return rp({
            uri: url,
            transform: (body) => {
                return cheerio.load(body);
            }
        })
    }

}
