import posts from "../data/posts.js";


function index(request, response){
    response.json(posts);
}
function show(request, response){
    const id = request.params.id;
    const realId = Number(id.trim());
    if (isNaN(realId)){
        response.status(404)
            .json({
                error: 'parametro id non corretto'
            });
        return;
    }
    if (realId <= 0){
        response.status(404)
            .json({
                error: 'parametro id negativo o zero (CORREGGI)'
            });
        return;

    }

    const postFound = posts.find(posts => {
        return posts.id === realId
    });

    if (postFound === undefined){
        response.status(404)
            .json({
                error: 'post non trovato',
                result: null
            });
        return;
    }

    response.json({
        error: null,
        results: postFound
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