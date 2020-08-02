let small_card = $('#small_card')
let small_image = $('#small_image')
let small_title = $('#small_title')
let small_introduction = $('#small_introduction')

function render_small_card() {
    console.log(meta_small_cover.val())
    small_image.attr("src", meta_small_cover.val());
    small_title.text(meta_title.val());
    small_introduction.text(meta_description.val())
}
