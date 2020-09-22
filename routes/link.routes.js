const { Router } = require("express");
const Link = require("../models/Link");
const config = require("config");
const shortid = require("shortid");

//auth don't give ghost-user use url(GET, POST, etc)
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl");
        const { from } = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({ from });

        if (existing) {
            return res.json({ link: existing });
        }

        const to = baseUrl + "/t/" + code;
        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });

    } catch (error) {
        //server error
        res.status(500).json({ message: "Кажется на сервере что то пошло не так..." });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (error) {
        //server error
        res.status(500).json({ message: "Кажется на сервере что то пошло не так..." });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);//
        res.json(link);
    } catch (error) {
        //server error
        res.status(500).json({ message: "Кажется на сервере что то пошло не так..." });
    }
});

module.exports = router;