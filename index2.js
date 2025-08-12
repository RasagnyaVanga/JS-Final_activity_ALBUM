let head_of_albums = document.getElementById('albumheading');
let albumGrid = document.getElementById("albumGrid");
let head_of_photos = document.getElementById('photoheading');
let photoGrid = document.getElementById('photoGrid');

async function fetchusersData() {
    try {
        let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        let usersData = await usersResponse.json();
        let usersDropdown = document.getElementById('users_dropdown');    //picking the dropdown element 
        usersData.forEach(user => {
            let option = document.createElement('option');  //creating each option
            option.value = user.id;
            option.textContent = user.name;
            usersDropdown.appendChild(option);
        });
        usersDropdown.addEventListener('change', () => {
            onChangeUser(usersDropdown, usersData);
        });
    }
    catch (error) {
        console.log("error.message");
    }
}

fetchusersData();

function onChangeUser(usersDropdown, usersData) {
    let user_Id = Number(usersDropdown.value); 

    head_of_albums.innerHTML = 'Albums by';//reset to default
    albumGrid.innerHTML = '';
    head_of_photos.innerText = 'Photos in:'; // reset to default label
    photoGrid.innerHTML = '';
    
    let returningObject = usersData.find(user => user.id === user_Id); 
    head_of_albums.innerText = `Albums by ${returningObject.name}`;

    fetchAlbumData(user_Id);
}

async function fetchAlbumData(user_Id) {
    let albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user_Id}`);
    let albumsData = await albumsResponse.json();

    albumGrid.innerHTML = ''; //clearing already existing albums

    albumsData.forEach(album => {
        let eachalbum_div = document.createElement('button');
        eachalbum_div.className = 'each_album';
        eachalbum_div.textContent = album.title;

        eachalbum_div.addEventListener('click', () => {
            fetchPhotoData(album.id, albumsData);
        });

        albumGrid.appendChild(eachalbum_div);
    });
}

async function fetchPhotoData(album_Id, albumsData) {
    let photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album_Id}`);
    let photosData = await photosResponse.json();

    let returningObject = albumsData.find(a => a.id === album_Id);

    head_of_photos.innerHTML = '';
    head_of_photos.innerText = `Photos in ${returningObject.title}`;

    photoGrid.innerHTML = ''; //clearing already existing photos
    photosData.forEach(photo => {
        let eachphoto_div = document.createElement('div');
        eachphoto_div.className = 'each_photo';
        eachphoto_div.textContent = photo.title;
        photoGrid.appendChild(eachphoto_div);
    });
}