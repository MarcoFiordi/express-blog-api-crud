import posts from "../data/posts.js";


function index(request, response) {
    response.status(200).json(posts);
}


function show(request, response) {
    const id = request.params.id;
    const realId = Number(id.trim());
    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'parametro id non corretto'
            });
        return;
    }
    if (realId <= 0) {
        response.status(400)
            .json({
                error: 'parametro id negativo o zero'
            });
        return;

    }

    const postFound = posts.find(post => {
        return post.id === realId
    });

    if (postFound === undefined) {
        response.status(404)
            .json({
                error: 'post non trovato',
                result: null
            });
        return;
    }

    response.status(200).json({
        error: null,
        result: postFound
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
    const id = request.params.id;
    response.json({
        messaggio: `modifica del post ${id}`
    })
}
function modify(request, response) {
    const id = request.params.id;
    response.json({
        messaggio: `modifica parziale del post ${id}`
    })

}
function destroy(request, response) {
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
            error: 'parametro id negativo o 0'
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

    posts.splice(postIndex, 1);

    console.log(posts);




    response.status(200).json({
        messaggio: `distruzione del post ${realId}`
    });
}


export {
    index,
    store,
    update,
    modify,
    destroy,
    show
};