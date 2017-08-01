import React from 'react'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ book, onChangeShelf }) => {
	return (
		<div className="book-shelf-changer">
			<select
				value={book.shelf}
				onChange={({ target }) => onChangeShelf(book, target.options[target.selectedIndex].value)}
			>
				<option value="none" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		</div>
	)
}

BookShelfChanger.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
}

export default BookShelfChanger