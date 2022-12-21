document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/ramens';
    let ramensArray;
    let myCurrentRamen;

    //Gather up the toops
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenMenuImage = document.querySelector('.detail-image');
    const ramenMenuName = document.querySelector('.name');
    const ramenMenuRest = document.querySelector('.restaurant');
    const ramenMenuRating = document.querySelector('#rating-display');
    const ramenMenuComment = document.querySelector('#comment-display');
    const newRamenForm = document.querySelector('#new-ramen');
    const newRamenButton = document.querySelector('form');
    newRamenButton.addEventListener('submit', (e) => {
        e.preventDefault()
        newRamenButtonClicked();
    })
    const newName = document.querySelector('#new-name');
    const newRest = document.querySelector('#new-restaurant');
    const newImage = document.querySelector('#new-image');
    const newRating = document.querySelector('#new-rating');
    const newComment = document.querySelector('#new-comment');

    function getAllData() {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            ramensArray = data;
            ramensArray.map(ramen => {
                addRamenToNav(ramen)
            })
        })
    }
    function setFirstImage() {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            imageClicked(data[0])
        })
    }

    function addRamenToNav(ramen) {
        //create the image
        const img = document.createElement('img');
        img.src = ramen.image;
        //Image will need to be a button
        img.addEventListener('click', () => {
            imageClicked(ramen);
        })
            //append the image to ramenMenu
        ramenMenu.appendChild(img);
    }
    function imageClicked(ramen) {
        ramenMenuImage.src = ramen.image;
        ramenMenuName.innerHTML = ramen.name;
        ramenMenuRest.innerHTML = ramen.restaurant;
        ramenMenuRating.innerHTML = ramen.rating;
        ramenMenuComment.innerHTML = ramen.comment;
    }

    // Deal with the form meow
    function newRamenButtonClicked(){
        let myUpdate = {
            name: newName.value,
            restaurant: newRest.value,
            image: newImage.value,
            rating: newRating.value,
            comment: newComment.value
        }
        fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(myUpdate)
        })
        .then(res => res.json())
        .then(res => {
            addRamenToNav(res)
            imageClicked(res)
        })
    }
    getAllData();
    setFirstImage()
});