const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    res.render('snake', {user: req.user})
})

router.post('/', async (req, res) => {
    const {score} = req.body
    const foundUser = await User.findOne({username: req.user.username})
    await User.updateOne({username: req.user.username}, {
        $set: {
            coins: (Number(score) * 2) + foundUser.coins,
            snakeCooldown: new Date().setMinutes(new Date().getMinutes() + 30)
        }
    })
})

module.exports = router