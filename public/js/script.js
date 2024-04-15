const cardList = [
    {
        title: "Bernese Mountain Dog",
        image: "images/bernesemountaindog.jpg",
        link: "https://be.chewy.com/dog-breed/bernese-mountain-dog/",
        description: "Bernese Mountain Dogs are large and powerful, but their playful brown eyes reveal their affectionate, sweet personality traits. They have a muscular, proud gait that lends them an almost noble appearance. Their thick, distinctly marked tri-color coat is mostly black in color, with white markings and rust-colored highlights. Their bushy tails wag eagerly when they see you, as they’re always ready to please."
    },
    {
        title: "Border Collie",
        image: "images/bordercollie.jpg",
        link: "https://be.chewy.com/dog-breed/Border-Collie/",
        description: "Athletic and muscular, these medium dogs exude strength. The Border Collie is a working dog who often has an intense, expressive gaze coming from their almond-shaped eyes. Their ears are just as expressive, frequently switching between alert and semi-alert positions as they take in the world around them; and their tail stands proudly when they’re happy or excited. Their double-coated fur comes in two types—a rough (medium-length) coat and a smooth (short) coat—as well as in a variety of color options, including blue merle, red merle, black and lilac."
    },
    {
        title: "Shiba Inu",
        image: "images/shibainu.jpg",
        link: "https://be.chewy.com/dog-breed/Shiba-Inu/",
        description: "The Shiba Inu breed is a compact but highly athletic dog with an alert expression, especially when they’re excited or playing (unless they’re giving you the side-eye). And they always seem to have a smile on their face. These pups resemble a fox’s better-looking cousin with their distinctive red coats, bushy tails held over their backs and their fuzzy, pointy ears."
    }
];

const submitForm = () => {
    let formData = {};
    formData.title = $('#breed').val();
    formData.subTitle = $('#color').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();
    console.log("Form Data Submitted: ", formData);
    $('#formModal').modal('close');
};

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    $('#formModal').modal('close');
    });
    
    $('#clickMeButton').click(() => {
        $('#modal1').modal('open');
    });
    addCards(cardList);
    $('.modal').modal();
});

const addCards = (items) => {
    items.forEach((item) => {
      let itemToAppend =
        '<div class="col s4 center-align">' +
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
        item.image +
        '">' +
        '</div><div class="card-content">' +
        '<span class="card-title activator grey-text text-darken-4">' +
        item.title +
        '<i class="material-icons right">more_vert</i></span><p><a href="' +
        item.url +
        '">' +
        item.link +
        "</a></p></div>" +
        '<div class="card-reveal pink lighten-3">' +
        '<span class="card-title grey-text text-darken-4">' +
        item.title +
        '<i class="material-icons right">close</i></span>' +
        '<p class="card-text">' +
        item.desciption +
        "</p>" +
        "</div></div></div>";
      $("#card-section").append(itemToAppend);
    });
  };

const getcards = () => {
    $.get('/api/dogs', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    })
}
