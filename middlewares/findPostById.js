import posts from '../data/posts.js';

function findPostById(request, response, next) {
    const id = request.params.id;
    const realId = Number(id.trim());

    if (isNaN(realId)) {
        response.status(400).json({
            error: 'parametro id non corretto'
        });
        return;
    }

    if (realId <= 0) {
        response.status(400).json({
            error: 'parametro id negativo o uguale a 0'
        });
        return;
    }

    const postIndex = posts.findIndex(post => {
        return post.id === realId;
    });

    if (postIndex === -1) {
        response.status(404).json({
            error: 'post non trovato',
            result: null
        });
        return;
    }

    request.realId = realId;
    request.postIndex = postIndex;
    request.postFound = posts[postIndex];

    next();
}

export default findPostById;