module.exports = fn => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	}
}
// module.exports = fn => {
// 	console.log("FN...",fn);
// 	// return (req, res, next) => {
// 		// console.log("INSIDE RETURN...", req, res, next);
// 		return fn(req, res, next).catch(next);
// 	// }
// }