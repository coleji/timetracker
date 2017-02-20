import http from 'http';

var makeAPIRequest = function(params) {
	return new Promise((resolve, reject) => {
		let options = {
			hostname: 'localhost',
			port: 8080,
			path: '/api' + params.apiEndpoint,
			method: params.httpMethod,
			headers: { }
		};
		if (params.httpMethod == 'POST') {
			options.headers['Content-Type'] = 'application/json';
			options.headers['Content-Length'] = JSON.stringify(params.postData).length;
		}

		let req = http.request(options, (res) => {
			let resData = '';
			res.on('data', (chunk) => {
				resData += chunk;
			});
			res.on('end', () => {
				let response = JSON.parse(resData);
				resolve(response);
			});
		});
		req.on('error', (e) => {
			reject(e);
		});

		if (params.httpMethod == 'POST') {
			req.write(JSON.stringify(params.postData));
		}
		req.end();
	});
};

var createActionFromAPIResponse = function(params) {
	return new Promise((resolve, reject) => {
		makeAPIRequest({
			apiEndpoint: params.apiEndpoint,
			httpMethod: params.httpMethod,
			postData: params.postData
		})
		.then((json) => {
			let data = json.data;
			if (params.dataForEach) data.forEach(params.dataForEach);
			resolve(data);
		}).catch((e) => {
			reject(e);
		});
	});
};

export {
	makeAPIRequest,
	createActionFromAPIResponse
};
