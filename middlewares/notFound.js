function notFound(request, response) {
    response.status(404).json({
        error: 'Endpoint non trovato'
    });
}

export default notFound;