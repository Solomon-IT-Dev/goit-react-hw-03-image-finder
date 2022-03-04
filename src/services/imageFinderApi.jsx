const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24992333-26303cf37c585c2123ccaf94d';

export default async function findImages(searchQuery, page, errorMessage) {
        const response = await fetch(`${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        if (response.ok) {
                const imagesSet = await response.json();
                return imagesSet;
        };
        
        return Promise.reject(new Error(errorMessage));
};