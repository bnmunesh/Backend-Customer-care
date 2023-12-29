const express = require('express');
const router = express.Router();


router.get("/hi", (req, res)=>{
    res.status(200).json({success: true, data: "hi Get Request", error: null})
})

router.post("/hi", (req, res)=>{
    const {username, password} = req.body;
    res.status(200).json(`hi ${username}`)
})

module.exports = router