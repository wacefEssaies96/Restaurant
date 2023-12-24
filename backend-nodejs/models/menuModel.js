const mongoose = require("mongoose")

const MenuSchema = mongoose.Schema({
        libelle: {
            type: String,
            required: true,
        },
        image: {
            type: String
        },
        prix: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu