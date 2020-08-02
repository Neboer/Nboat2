$('#preview').click(() => {
    render_small_card()
    render_big_card()
    if (is_big_blog()) {
        small_card.hide()
        big_card.show()
    } else {
        big_card.hide()
        small_card.show()
    }
    render_article_preview()
    preview_area.show()
    edit_area.hide()
})
