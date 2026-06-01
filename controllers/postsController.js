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