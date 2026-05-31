function errorsHandler(error, request, response, next) {
    response.status(500).json({
        error: 'Errore interno del server'
    });
}

export default errorsHandler;