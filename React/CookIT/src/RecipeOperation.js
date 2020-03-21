import { Image } from 'react-native';

function setUrlParameter(url, key, value) {
    var key = encodeURIComponent(key),
        value = encodeURIComponent(value);

    var baseUrl = url.split('?')[0],
        newParam = key + '=' + value,
        params = '?' + newParam;

    if (url.split('?')[1] === undefined) { // if there are no query strings, make urlQueryString empty
        urlQueryString = '';
    } else {
        urlQueryString = '?' + url.split('?')[1];
    }

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '=[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if (value === undefined || value === null || value === '') { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace(/[&;]$/, "");

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else if (urlQueryString == '') { // If there are no query strings
            params = '?' + newParam;
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params === '?' ? '' : params;

    return baseUrl + params;
}

export class RecipeOperation {

    constructor() {
        this.state = {
            queue: [],
            preloadedImages: [],
            future_len: 10,
            past_len: 5,
            index: 0,
            recipeType: ""
        }
    }

    getRecipeType() {
        return this.state.recipeType
    }

    setRecipeType(type) {
        this.state.recipeType = type
    }

    reloadFuture() {
        this.clearFuture(false)
        this.fillFuture()
    }

    getQueueLen() {
        return this.state.queue.length
    }

    async apiReq() {
        var ret = await fetch('https://cookit-server.herokuapp.com/randomRecipe/' + this.state.recipeType.replace(" ", "-"), { method: 'GET' })
        ret = await ret.json()
        return ret
    }

    async apiReqParam(route, params) {
        var url = 'https://cookit-server.herokuapp.com/' + route
        for (param in params) {
            url = setUrlParameter(url, param, params[param])
        }
        var ret = await fetch(url, { method: 'GET' })
        ret = await ret.json()
        return ret
    }

    async apiPub(route, params) {
        var url = 'https://cookit-server.herokuapp.com/' + route
        for (param in params) {
            url = setUrlParameter(url, param, params[param])
        }
        console.log(url)
        fetch(url)
    }

    async fillFuture(caller, callback, forceCallback) {
        while (this.state.queue.length < this.state.past_len + this.state.future_len) {
            this.state.queue.push(await this.apiReq())
            if ((this.state.queue.length == 1 && callback) || forceCallback == true) {
                callback(caller, this.state.queue[this.state.index])
            }
        }
    }

    async preloadImages() {
        this.state.queue.forEach(recipe => {
            this.state.preloadedImages.push(Image.prefetch(recipe.image))
        })
        Promise.all(this.state.preloadedImages).then((results) => {
            let downloadedAll = true;
            results.forEach((result) => {
                if (!result) {
                    downloadedAll = false;
                }
            })
            if (downloadedAll) {
                // Loaded all Images
            }
        })
    }

    async clearFuture(deleteCurrent) {
        this.state.queue = this.state.queue.slice(0, this.state.index)
    }

    getRecipe() {
        if (this.state.queue.length > 0) {
            return this.state.queue[this.state.index]
        }
    }

    getNextRecipe() {
        if (this.state.index < this.state.past_len) {
            this.state.index += 1
        }
        else {
            this.state.queue.shift()
            this.fillFuture()
        }
        var rec = this.state.queue[this.state.index]
        return rec
    }

    getPreviousRecipe() {
        if (this.state.index > 0) {
            this.state.index -= 1
            return this.state.queue[this.state.index]
        }
        else {
            return null
        }
    }

    rateRec(val) {
        const params = {
            name: this.state.queue[this.state.index].name,
            rate: val
        }
        this.apiPub("image/rate", params)
    }

}