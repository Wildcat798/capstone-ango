const { layout } = require("../layout")

const home = (req, res) => {
    res.render("home", {
        locals: {
            title: "ANGO Home",
            errormsg: ""
        },
        ...layout,
    })
}

module.exports = {
    home
}