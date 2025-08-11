async function fetchUsersData() {
    try {
        let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        let usersdata = await usersResponse.json();
        let usersDropdown = document.getElementById('users_dropdown');    //picking the dropdown element 
        function populateUsers(usersdata) {
            usersdata.forEach(user => {
                let option = document.createElement('option');  //creating each option
                option.value = user.id;
                option.textContent = user.name;
                usersDropdown.appendChild(option);
            });
        }
        populateUsers(usersdata);
        usersDropdown.addEventListener('change', () => {
            onChangeUser(usersDropdown, usersdata);
        });
    }
    catch (error) {
        console.log("error.message");
    }
}

fetchUsersData();

function onChangeUser(usersDropdown, usersdata) {
    let user_Id = Number(usersDropdown.value); //.value gives string so converting it into number

    let returning_object = usersdata.find(user => user.id === user_Id); //heading of albums with the user selected

    let head_of_albums = document.getElementById('albumheading');
    head_of_albums.innerHTML = '';
    head_of_albums.innerText = `Albums by ${returning_object.name}`;

    let head_of_photos = document.getElementById('photoheading');
    head_of_photos.innerText = 'Photos in:'; // reset to default label

    let photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = ''; // remove all previous photo elements
    
    fetchAlbumData(user_Id);
}

async function fetchAlbumData(user_Id) {
    let albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
    let albumsdata = await albumsResponse.json();

    let album_grid = document.getElementById("albumGrid"); //picking the whole albumgrid div 
    album_grid.innerHTML = ''; //clearing already existing albums

    let album_list = albumsdata.filter(album => album.userId === user_Id);
    album_list.forEach(album => {
        let eachalbum_div = document.createElement('button');
        eachalbum_div.className = 'each_album';
        eachalbum_div.textContent = album.title;

        eachalbum_div.addEventListener('click', () => {
            fetchPhotoData(album.id, albumsdata);
        });

        album_grid.appendChild(eachalbum_div);
    });

}

async function fetchPhotoData(album_Id, albumsdata) {
    let photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    let photosdata = await photosResponse.json();

    let returning_object = albumsdata.find(a => a.id === album_Id); //heading of photos with the album title
    let head_of_photos = document.getElementById('photoheading');
    head_of_photos.innerHTML = '';
    head_of_photos.innerText = `Photos in ${returning_object.title}`;

    let album_photos = photosdata.filter(photo => photo.albumId === album_Id);
    let photos_grid = document.getElementById("photoGrid");
    photos_grid.innerHTML = ''; //clearing already existing photos
    album_photos.forEach(photo => {
        let eachphoto_div = document.createElement('div');
        eachphoto_div.className = 'each_photo';
        eachphoto_div.textContent = photo.title;
        photos_grid.appendChild(eachphoto_div);
    });
}