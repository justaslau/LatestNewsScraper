const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');
const db = require("../models");

router.get("/all", function(req, res) {
db.Article
				.find()
				.populate("comments")
				.sort({ date: -1 })
				.then(articles => res.json(articles));
});

router.get("/", function(req, res) {

	const getScrapedNews = (scrapedNews) => {
		// Function to pull all documents from database
		// Sorted by date, newest on top
		const pullDocuments = () => {
			db.Article
				.find()
				.populate("comments")
				.sort({ date: -1 })
				.then(articles => res.render("index", { articles }));
		}
		addToDatabase(scrapedNews, pullDocuments);
	}
	// Available sports: golf, soccer, hockey, tennis
	scrapeNews('basketball', getScrapedNews);
});


// Function to scrape articles from NY Times Sports Section
// Every scraped article is pushed to array
// If article doesn't have image, assign palceholder
const scrapeNews = (sport, callback) => {
	axios.get(`https://www.nytimes.com/section/sports/${sport}`).then(function(response) {
		var $ = cheerio.load(response.data);
		const news = [];
		$(".latest-panel .stream ol li .story").each(function(i, element) {
			const title = $(element).find('.headline').text().trim();
			const summary = $(element).find('.summary').text().trim();
			let image = $(element).find('.wide-thumb').children('img').attr('src');
			const date = $(element).find('.story-footer').children('time').attr('datetime');
			const link = $(element).find('.story-link').attr('href');
			const author = $(element).find('.byline').text();
			if (!image) {
				image = 'https://dummyimage.com/348x232';
			}
			console.log("scraped");
			const article = {title, summary, image, date, link, author}
			news.push(article);
		});
		callback(news);
	});
}

// Function to find doc in database by title
// If doc doesn't exist, new will be added
const addToDatabase = (scrapedNews, callback) => {
	scrapedNews.map(article => {
		const {title, summary, image, link, date} = article;
		db.Article.findOneAndUpdate(
			{ title },
			{ summary, image, link, date },
			{ upsert: true }
		);
	});
	callback();
}

module.exports = router;