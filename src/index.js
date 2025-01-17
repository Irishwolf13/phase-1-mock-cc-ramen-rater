document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/ramens';
    let ramensArray;
    let myCurrentRamen;
    let myCurrentImage;

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

    //Delete Button
    const deleteButton = document.querySelector('h4');
    deleteButton.innerHTML = "Delete Current Ramen";
    deleteButton.addEventListener('click', (e) => {
        //console.log(myCurrentRamen);
        fetch(`${url}/${myCurrentRamen.id}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(myCurrentImage)
            myCurrentImage.remove();
            setFirstImage();
        })
    })

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
            myCurrentRamen = data[0]
            myCurrentImage = document.querySelector('img');
        })
    }

    function addRamenToNav(ramen) {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.dataset.place = ramen.id;
        img.addEventListener('click', (e) => {
            myCurrentImage = e.target;
            imageClicked(ramen);
        })
        // This deals with the case where there is no image
        img.addEventListener('error', (e) => {
            e.target.src = "https://curriculum-content.s3.amazonaws.com/phase-1/phase-1-mock-cc-ramen-rater/demo-gif.gif"
            e.onerror = null;
        })
        ramenMenu.appendChild(img);
    }
    function imageClicked(ramen) {
        ramenMenuImage.src = ramen.image;
        ramenMenuName.innerHTML = ramen.name;
        ramenMenuRest.innerHTML = ramen.restaurant;
        ramenMenuRating.innerHTML = ramen.rating;
        ramenMenuComment.innerHTML = ramen.comment;
        // This deals with the case where there is no image
        ramenMenuImage.addEventListener('error', (e) => {
            e.target.src = "https://curriculum-content.s3.amazonaws.com/phase-1/phase-1-mock-cc-ramen-rater/demo-gif.gif"
            e.onerror = null;
        })
        myCurrentRamen = ramen;
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
        newRamenForm.reset();
    }

    getAllData();
    setFirstImage()
});