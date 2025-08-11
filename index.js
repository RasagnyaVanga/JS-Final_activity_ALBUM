async function fetchData() {
    try {
        //fetching from endpoint
        let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        //parsing json
        usersdata = await usersResponse.json(); //response is an object, turning it into json.

        let albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        albumsdata = await albumsResponse.json();

        let photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        photosdata = await photosResponse.json();

        //populating users dropdown is first task after fetching data.
        populatingUsers(usersdata);
    }
    catch (error) {
        console.log(error.message);
    }
}

let usersDropdown = document.getElementById('users_dropdown');    //picking the dropdown element 
function populatingUsers(usersdata) {
    usersdata.forEach(user => {
        let option = document.createElement('option');  //creating each option
        option.value = user.id;
        option.textContent = user.name;
        usersDropdown.appendChild(option);
    });
}
fetchData();

//when user is changed., album of respective user should be retrieved
usersDropdown.addEventListener('change', () => {
    let userId = Number(usersDropdown.value); //.value gives string so converting it into number

    let returning_object = usersdata.find(user => user.id === userId); //heading of albums with the user selected
    let head_of_albums = document.getElementById('albumheading');
    head_of_albums.innerHTML = '';
    head_of_albums.innerText = `Albums by ${returning_object.name}`;


    let album_list = albumsdata.filter(album => album.userId === userId);
    displayAlbum(album_list);
});

function displayAlbum(album_list) {
    let album_grid = document.getElementById("albumGrid"); //picking the whole albumgrid div 
    album_grid.innerHTML = ''; //clearing already existing albums

    album_list.forEach(album => {
        let eachalbum_div = document.createElement('button');
        eachalbum_div.className = 'each_album';
        eachalbum_div.textContent = album.title;

        eachalbum_div.addEventListener('click', () => {
            let album_photos = photosdata.filter(photo => photo.albumId === album.id);

            let returning_object = albumsdata.find(a => a.id === album.id); //heading of photos with the album title
            let head_of_photos = document.getElementById('photoheading');
            head_of_photos.innerHTML = '';
            head_of_photos.innerText = `Photos in ${returning_object.title}`;

            displayPhotos(album_photos);
        });

        album_grid.appendChild(eachalbum_div);
    });
}

function displayPhotos(album_photos) {
    let photos_grid = document.getElementById("photoGrid");
    photos_grid.innerHTML = ''; //clearing already existing photos
    album_photos.forEach(photo => {
        let eachphoto_div = document.createElement('div');
        eachphoto_div.className = 'each_photo';
        eachphoto_div.textContent = photo.title;
        photos_grid.appendChild(eachphoto_div);
    })
}