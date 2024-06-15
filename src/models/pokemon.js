const validTypes = [
  'Plante',
  'Poison',
  'Feu',
  'Eau',
  'Insecte',
  'Vol',
  'Normal',
  'Electrik',
  'Fée',
]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déja pris.',
        },
        validate: {
          notEmpty: { msg: 'Le nom ne peu pas être vide.' },
          notNull: { msg: 'Le nom du pokémon est un propriété requise' },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Utilisez uniquement des nombres entiers pour les points de vie',
          },
          notNull: { msg: 'Les points de vie sont obligatoires' },
          min: {
            args: [0],
            msg: 'Les points de vie doivent êtres supérieur ou égals à 0.',
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent être inférieurs ou égals à 999.',
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Utilisez uniquement des nombres entiers pour les points de dégats',
          },
          notNull: { msg: 'Les points de dégats sont obligatoires' },
          min: {
            args: [0],
            msg: 'Les points de dégats doivent êtres supérieur ou égals à 0.',
          },
          max: {
            args: [99],
            msg: 'Les points de dégats doivent être inférieurs ou égals à 99.',
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Le chemin du fichier image doit être un adresse web valide.',
          },
          notNull: { msg: `L'image est obligatoire` },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error('Un pokémon doit avoir au moin un type')
            }
            if (value.split(',').lenght > 3) {
              throw new Error('Un pokémon ne peut avoir plus de 3 types.')
            }
            value.split(',').forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivant: ${validTypes}`,
                )
              }
            })
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
    },
  )
}
