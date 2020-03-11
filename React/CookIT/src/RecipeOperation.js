import RNFetchBlob from 'react-native-fetch-blob'
import { Image } from 'react-native';

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
        this.clearFuture()
        this.fillFuture()
    }

    getQueueLen() {
        return this.state.queue.length
    }

    async apiReq() {
        var ret = await RNFetchBlob.fetch('GET', 'https://cookit-server.herokuapp.com/randomRecipe/' + this.state.recipeType)
        ret = await JSON.parse(ret.data)
        return ret
    }

    async fillFuture(func, callback) {
        while (this.state.queue.length < this.state.past_len + this.state.future_len) {
            this.state.queue.push(await this.apiReq())
            if (this.state.queue.length == 1 && callback) {
                callback(func, this.state.queue[this.state.index])
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

    clearFuture() {
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

}