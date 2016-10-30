import getPunches from './actions/getPunches.js'

export default function(url) {
//	switch (url) {
//	case "/getPunches":
		return getPunches();
//	default:
//		console.log("unable to route " + url)
//		return Promise.resolve({data: "API Success!"});
//	}
}
