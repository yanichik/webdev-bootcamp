const express = require('express')
const router = express.Router();
const cookieParser = require('cookie-parser');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthorLoggedIn, validateCampground} = require('../middleware');
const campController = require('../controllers/campController');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

// USING this path starter for all paths in this doc: app.use('/campgrounds', campgroundsRoutes);
router.route('/')
	.get(catchAsync(campController.renderIndex))
	.post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campController.createNewCamp));
	// .post(upload.array('image'), (req, res, next) => {
	// 	console.log(req.body, req.files);
	// 	res.send("File uploaded.");
	// })

router.get('/new', isLoggedIn, campController.renderNewForm);

router.route('/:id')
	.get(catchAsync(campController.showCamp))
	.put(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campController.editCamp))
	.delete(isLoggedIn, catchAsync(campController.deleteCamp));

router.get('/:id/edit', isLoggedIn, isAuthorLoggedIn, catchAsync(campController.renderEditForm));

module.exports = router;




