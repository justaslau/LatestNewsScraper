$('.submit-comment').on('click', (event) => {
	// Get input values
	const articleId = event.target.dataset.id;
	const user = $('.form-' + articleId + ' #name').val();
	const comment = $('.form-' + articleId + ' #comment').val();

	// POST to comment route
	$.post("/comments/add", { user, comment, articleId }).then(function(data) {
        // Validation for comment inputs
		if (data.userError) {
            $(`.form-${articleId} input`).css('border', 'solid 1px red');
        } else if (data.commError) {
            $(`.form-${articleId} textarea`).css('border', 'solid 1px red');
		} else {
            // Generate new comment before append
			const div = $('<div />').attr('class', 'alert alert-warning');
            div.html(`<span class="name">${data.newComment.user}:</span> ${data.newComment.comment}
            <button type="button" class="close delete-comment" data-dismiss="alert" aria-label="Close">
            <span data-id="${data.newComment._id}" data-aid="${articleId}" aria-hidden="true">&times;</span>
            </button>`);
        
			// Update comments count and append comment
			div.appendTo(`#con${data.articleId} .comment-body`);
            $(`.ctn${articleId}`).text(data.totalCount);
            // Clear inputs set default styles
	        $('.form-' + articleId + ' #name').val('');
            $('.form-' + articleId + ' #comment').val('');
            $(`.form-${articleId} textarea`).css('border', 'solid 1px #ced4da');
            $(`.form-${articleId} textarea`).css('border', 'solid 1px #ced4da');
            
		}
	});
});

// POST to comment delete route and update DOM
$('body').on('click', '.delete-comment', (event) => {
    const commId = event.target.dataset.id;
    const articleId = event.target.dataset.aid;
    $.post("/comments/delete", { commId }).then(function(data) {
        $(`.ctn${articleId}`).text(data-1);
    });
});