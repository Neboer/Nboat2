let big_card = $('#big_card')
let big_image = $('#big_image')
let big_title = $('#big_title')
let big_introduction = $('#big_introduction')

function render_big_card() {
    big_image.attr("src", meta_small_cover.val());
    big_title.text(meta_title.val());
    big_introduction.text(meta_description.val())
}
