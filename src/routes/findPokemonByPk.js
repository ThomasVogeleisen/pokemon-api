const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant."
          return res.status(404).json({ message })
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch((err) => {
        const message =
          "Une erreur s'est produite lors de la recherche du pokémon. Merci de réessayer dans quelques instants."
        res.status(500).json({ message, data: err })
      })
  })
}
