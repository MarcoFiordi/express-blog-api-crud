import posts from "../data/posts.js";


function index(request, response) {
    response.status(200).json(posts);
}


function show(request, response) {
    response.status(200).json({
        error: null,
        result: request.postFound
    });
}

function store(request, response) {
    const nuovoPost = request.body;

    if (!nuovoPost.title ||
        typeof nuovoPost.title !== 'string' ||
        nuovoPost.title.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il titolo'
        });
        return;
    }

    if (!nuovoPost.content ||
        typeof nuovoPost.content !== 'string' ||
        nuovoPost.content.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il contenuto'
        });
        return;
    }

    if (!nuovoPost.image ||
        typeof nuovoPost.image !== 'string' ||
        nuovoPost.image.trim() === ''
    ) {
        response.status(400).json({
            error: "inserisci un'immagine"
        });
        return;
    }

    if (!Array.isArray(nuovoPost.tags) ||
        nuovoPost.tags.length === 0 ||
        nuovoPost.tags.some(tag => {
            return typeof tag !== 'string' || tag.trim() === ''
        })
    ) {
        response.status(400).json({
            error: 'il tag deve essere un array di stringhe'
        });
        return;
    }
    if (
        typeof nuovoPost.prep_time !== 'number' ||
        nuovoPost.prep_time <= 0
    ) {
        response.status(400).json({
            error: 'il prep_time deve essere un numero maggiore di 0'
        });
        return;
    }

    const newId = posts[posts.length - 1].id + 1;
    const newSlug = nuovoPost.title
        .trim()
        .toLowerCase()
        .replaceAll(' ', '-');


    const postToCreate = {
        id: newId,
        title: nuovoPost.title.trim(),
        content: nuovoPost.content.trim(),
        image: nuovoPost.image.trim(),
        tags: nuovoPost.tags,
        slug: newSlug,
        published: true,
        prep_time: nuovoPost.prep_time,
        created_at: new Date().toISOString()
    };

    posts.push(postToCreate);

    console.log(posts);

    response.status(201).json({
        error: null,
        message: 'Post creato correttamente',
        data: postToCreate
    });



}

function update(request, response) {
    

    const realId = request.realId;
    const postIndex = request.postIndex;
    const updatePost = request.body;
    console.log(updatePost);

    if (
        !updatePost.title ||
        typeof updatePost.title !== 'string' ||
        updatePost.title.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il titolo'
        });
        return;
    }

    if (
        !updatePost.content ||
        typeof updatePost.content !== 'string' ||
        updatePost.content.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci il contenuto'
        });
        return;
    }

    if (
        !updatePost.image ||
        typeof updatePost.image !== 'string' ||
        updatePost.image.trim() === ''
    ) {
        response.status(400).json({
            error: 'Inserisci l’immagine'
        });
        return;
    }

    if (
        !Array.isArray(updatePost.tags) ||
        updatePost.tags.length === 0 ||
        updatePost.tags.some(tag => {
            return typeof tag !== 'string' || tag.trim() === '';
        })
    ) {
        response.status(400).json({
            error: 'Inserisci almeno un tag valido'
        });
        return;
    }

    if (
        typeof updatePost.prep_time !== 'number' ||
        updatePost.prep_time <= 0
    ) {
        response.status(400).json({
            error: 'Il prep_time deve essere un numero maggiore di 0'
        });
        return;
    }

    const { title, content, image, tags, prep_time } = updatePost;

    const newSlug = title
        .trim()
        .toLowerCase()
        .replaceAll(' ', '-');

    const postUpdated = {
        ...posts[postIndex],
        title: title.trim(),
        content: content.trim(),
        image: image.trim(),
        tags,
        slug: newSlug,
        prep_time
    };
    posts.splice(postIndex, 1, postUpdated);

    console.log(posts);





    response.status(200).json({
        error: null,
        message: `Post ${realId} modificato correttamente`,
        data: postUpdated
    });
}
function modify(request, response) {
    const id = request.params.id;
    response.json({
        messaggio: `modifica parziale del post ${id}`
    })

}
function destroy(request, response) {
    const postIndex = request.postIndex;

    posts.splice(postIndex, 1);

    console.log(posts);

    response.status(204).send();
}


export {
    index,
    store,
    update,
    modify,
    destroy,
    show
};