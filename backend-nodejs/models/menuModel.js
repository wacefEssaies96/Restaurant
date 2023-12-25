const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

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
MenuSchema.plugin(mongoosePaginate);
const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu