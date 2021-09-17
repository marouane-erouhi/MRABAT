const asyncHandler = require("express-async-handler");
const School = require('../models/school')
const cloudinary = require('../utils/cloudinary')

// @route GET /school
// @desc get all schools
exports.getAllSchools = asyncHandler(async (req, res, next) => {

    const schools = await School.find({});

    res.status(200).json({
        msg: "all schools",
        schools
    });
});

// @route POST /school
// @desc add a school
exports.addSchool = asyncHandler(async (req, res, next) => {

    // check if school exists
    const school = await School.findOne({ name: req.body.schoolName });
    if (school) {
        return res.status(200).json({
            success: false,
            msg: 'school already exists'
        });
    }

    // upload image
    const imageResponse = await cloudinary.uploader.upload(req.files[0].path)

    const schoolData = {
        name: req.body.schoolName,
        about: req.body.about,
        admission: req.body.admission,
        location: req.body.location,
        imageUrl: imageResponse.url
    }

    await School.create(schoolData);

    res.status(200).json({
        success: true,
        msg: 'School created'
    });
});

// @route PATCH /school
// @desc edit school info
exports.editSchool = asyncHandler(async (req, res, next) => {

    const oldName = req.body.oldName

    // check if school exists
    const school = await School.findOne({ name: oldName });
    if (!school) {
        return res.status(200).json({
            success: false,
            msg: "school thosen't exists exists"
        });
    }

    //upload new image
    let imageResponse = null
    if (req.files.length > 0) {
        imageResponse = await cloudinary.uploader.upload(req.files[0].path)
    }

    const schoolData = {
        name: req.body.schoolName,
        about: req.body.about,
        admission: req.body.admission,
        location: req.body.location,
        imageUrl: imageResponse !== null ? imageResponse.url : school.imageUrl
    }

    await School.findOneAndUpdate({ name: oldName }, schoolData);

    res.status(200).json({
        msg: "school edited",
        success: true
    });
});
