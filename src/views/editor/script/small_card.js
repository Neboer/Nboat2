let small_card = $('#small_card')
let small_image = $('#small_image')
let small_title = $('#small_title')
let small_introduction = $('#small_introduction')

function render_small_card() {
    small_image.attr("src", meta_small_cover.val());
    small_title.innerText = meta_title.val();
    small_introduction = meta_description.val()
}