const searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (document.images.length > 0) {
        clearImages();
    }
    const userInput = this.elements.query.value
    //this.value didn't work, because this refers to the entire form. 
    //I want to select the input element within the form element. 
    //the input element has a name of query.
    getShowImages(userInput)
    this.elements.query.value = '';
})

const getShowImages = async (searchTerm) => {
    try {
        const config = { params: { q: searchTerm } }
        //params is a way that axios let's us change our search query/query strings
        //a bit confusing because this is how we set headers. But remember, we are not using headers here.
        //this API doesn't require headers
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        makeImages(res.data)
    } catch (error) {
        console.log('NO SHOW FOUND :(')
    }
}

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const searchImage = result.show.image.medium;
            const img = document.createElement('img');
            img.src = searchImage;
            document.body.append(img)
        }
    }
}

const clearImages = () => {
    const allImages = document.querySelectorAll('img');
    for (images of allImages) {
        images.remove();
    }
}