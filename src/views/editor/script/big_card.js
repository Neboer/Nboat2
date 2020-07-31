let big_card = $('#big_card')
let big_image = $('#big_image')
let big_title = $('#big_title')
let big_introduction = $('#big_introduction')

function render_big_card(m_title_input, m_description_input, m_small_cover) {
    big_image.attr("src", m_small_cover.val());
    big_title.innerText = m_title_input.val();
    big_introduction = m_description_input.val()
}