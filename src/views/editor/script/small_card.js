let small_card = $('#small_card')
let small_image = $('#small_image')
let small_title = $('#small_title')
let small_introduction = $('#small_introduction')

function render_small_card(m_title_input, m_description_input, m_small_cover) {
    small_image.attr("src", m_small_cover.val());
    small_title.innerText = m_title_input.val();
    small_introduction = m_description_input.val()
}