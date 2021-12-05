const sequelize400Errors = [
    'SequelizeUniqueConstraintError',
    'SequelizeValidationError',
    'CastError',
]

const errorHandler = (error, request, response, next) => {
    if (sequelize400Errors.includes(error?.name)) {
        return response
            .status(400)
            .send({ errors: error.errors.map((error) => error.message) })
    }

    next(error)
}

module.exports = errorHandler
