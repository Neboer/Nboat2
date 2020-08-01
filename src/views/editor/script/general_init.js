let preview_area = $('#preview_area')
let edit_area = $('#edit_area')
preview_area.hide()
$('#edit').click(() => {
    preview_area.hide()
    edit_area.show()
})
