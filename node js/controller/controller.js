const NoteUser = require("../models/models");

const post = async (req, res) => {
    try {
        const user = new NoteUser(req.body);
        const result = await user.save();
        res.status(201).json({ result });
    } catch (error) {
        console.error(error);
    }
};

const get = async (req, res) => {
    try {
        const status = req.query.status;
        var userData;
        if (status === "all" || status === "") {
            userData = await NoteUser.find();
        } else {
            userData = await NoteUser.find({ status: status });
        }
        res.status(200).json(userData);
    } catch (error) {
        console.error("err", error);
    }
};

const putcontroll = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NoteUser.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
};

const delcontroll = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NoteUser.findByIdAndDelete(id);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { get, post, delcontroll, putcontroll };