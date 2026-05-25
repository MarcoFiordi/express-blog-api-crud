import posts from "../data/posts.js";


function index(request, response){
    response.status(200).json(posts);
}


function show(request, response){
    const id = request.params.id;
    const realId = Number(id.trim());
    if (isNaN(realId)){
        response.status(400)
            .json({
                error: 'parametro id non corretto'
            });
        return;
    }
    if (realId <= 0){
        response.status(400)
            .json({
                error: 'parametro id negativo o zero'
            });
        return;

    }

    const postFound = posts.find(post => {
        return post.id === realId
    });

    if (postFound === undefined){
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
    response.json({
        messaggio: "richiesta di creazione"
    })
}

function update(request, response){
    const id = request.params.id;
    response.json({
        messaggio:`modifica del post ${id}`
    })
}
function modify(request, response){
    const id = request.params.id;
    response.json({
        messaggio: `modifica parziale del post ${id}`
    })

}
function destroy(request, response){
    const id = request.params.id;
    const realId = Number(id.trim());

    if (isNaN(realId)){
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
    response.json({
        messaggio:`distruzione del post ${id}`
    })
}


export { index,
    store,
    update,
    modify,
    destroy,
    show};