const Menu = require("../models/menuModel")

exports.create = async (req, res) => {

    if (!req.body.libelle || !req.file || !req.body.prix) {
        return res.status(400).send({ message: 'Send all required fields : libelle, image and prix !' })
    }
    const { file } = req
    const newMenu = new Menu({
        libelle: req.body.libelle,
        image: (file && file.filename) || null,
        prix: req.body.prix
    })

    newMenu.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Menu!"
            });
        });
};

exports.findAll = async (req, res) => {
    const { query, page, limit = 2 } = req.query
    const options = {
        page,
        limit,
        collation: {
            locale: 'en'
        }
    }
    const regexQuery = new RegExp(query, 'i')
    try {
        const menus = await Menu.paginate(
            { libelle: regexQuery },
            options
        )
        res.json(menus)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getAll = (req, res) => {
    Menu.find()
        .then(menus => res.json(menus))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findMenuById = (req, res) => {
    Menu.findById(req.params.id)
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteMenu = async (req, res) => {
    Menu.findByIdAndDelete(req.params.id)
        .then(async () => {
            res.json('Menu is deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateMenu = (req, res) => {
    const { file } = req
    Menu.findById(req.params.id)
        .then(async (menu) => {
            menu.libelle = req.body.libelle;
            if (file)
                menu.image = (file && file.filename);
            menu.prix = req.body.prix;

            menu.save()
                .then(() => res.json('Menu is updated!'))
                .catch(err => res.status(500).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findMenuByName = (req, res) => {
    Menu.findOne({ libelle: req.params.libelle })
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
}