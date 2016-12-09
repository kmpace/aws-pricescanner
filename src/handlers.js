import Promise from 'bluebird';
import _fs from 'fs';
import aws from 'aws-sdk';
import scrape from './scrape';

aws.config.region = process.env.REGION || aws.config.region;

const outputName = 'products.json';

const s3 = Promise.promisifyAll(new aws.S3());
const fs = Promise.promisifyAll(_fs);


function rootHandler (req, res) {
	let result = {};
	let promises;

	let params = {Bucket: process.env.S3_BUCKET, Key: outputName, ContentType: 'application/json'};


	result.company = {};

	//Get all the promsise from the scrapers 
	promises = Object.getOwnPropertyNames(scrape).map(name => scraper[name]());

	Promise.all(promises)
		.then(response => {
			response.forEach(company => {
				result.company[company.name] = company;
			});

			params.Body = JSON.stringfly(result);

			//Async the data with S3
			return s3.putObjectAsync(params);

		})
		.then (() => {
			//IF a local copy exists, delete it
			if (fs.existsSync(outputName)) {
				fs.unlinkSync(outputName);

			}
			res.send('Scraped and saved to S3');


		})

		.catch(console.log.bind(console));


}


function apiHandler (req, res) {
	let params = {Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType: 'application/json'};
	let output;


	//Try to get the file local disk storage first
	fs.readFileAsync(outputName, 'utf8')
		.then(data => {
			res.json(JSON.parse(data));
		})

	.catch(err => {
		s3.getObjectAsync(params)
			.then(data => {
				output = data.Body.toString();
				return fs.writeFileAsync(outputName, output);

			})
			.then((data) => {
				res.json(JSON.parse(output));
			})
			.catch(console.log.bind(console));

	});

}

module.exports = {
	rootHandler,
	apiHandler
}