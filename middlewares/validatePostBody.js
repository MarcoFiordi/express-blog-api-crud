function validatePostBody(request, response, next) {
    const postData = request.body;

    if (
        !postData.title ||
        typeof postData.title !== 'string' ||
        postData.title.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il titolo'
        });
        return;
    }

    if (
        !postData.content ||
        typeof postData.content !== 'string' ||
        postData.content.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il contenuto'
        });
        return;
    }

    if (
        !postData.image ||
        typeof postData.image !== 'string' ||
        postData.image.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci l’immagine'
        });
        return;
    }

    if (
        !Array.isArray(postData.tags) ||
        postData.tags.length === 0 ||
        postData.tags.some(tag => {
            return typeof tag !== 'string' || tag.trim() === '';
        })
    ) {
        response.status(400).json({
            error: 'Inserisci almeno un tag valido'
        });
        return;
    }

    if (
        typeof postData.prep_time !== 'number' ||
        postData.prep_time <= 0
    ) {
        response.status(400).json({
            error: 'Il prep_time deve essere un numero maggiore di 0'
        });
        return;
    }

    next();
}

export default validatePostBody;