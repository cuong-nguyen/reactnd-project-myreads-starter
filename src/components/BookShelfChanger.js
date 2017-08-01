import React from 'react'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ books, onChangeShelf }) => {
	const { length: noOfBooks } = books
	return (
		<div className="book-shelf-changer">
			<select
				value={books[0].shelf}
				onChange={({ target }) => onChangeShelf(books, target.options[target.selectedIndex].value)}
			>
				<option value="none" disabled>{noOfBooks === 1 ? 'Move to...' : 'Move all to...'}</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		</div>
	)
}

BookShelfChanger.propTypes = {
	books: PropTypes.array,
	onChangeShelf: PropTypes.func.isRequired
}

export default BookShelfChanger