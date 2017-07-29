import React from 'react'
import PropTypes from 'prop-types'

const ShelfChanger = ({ book, onChangeShelf }) => {
	const shelves = [{
		value: 'currentlyReading',
		title: 'Currently Reading'
	},
	{
		value: 'wantToRead',
		title: 'Want to Read'
	},
	{
		value: 'read',
		title: 'Read'
	},
	{
		value: 'none',
		title: 'None'
	}]

	return (
		<select onChange={({ target }) => onChangeShelf(book, target.options[target.selectedIndex].value)}>
			<option value="none">Move to...</option>
			{shelves
				.filter(s => s.value !== book.shelf)
				.map((s, index) => <option key={index} value={s.value}>{s.title}</option>)
			}
		</select>
	)
}

ShelfChanger.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
}

const Book = ({ book, width, height, onChangeShelf }) => {

	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover"
					style={{
						width,
						height,
						backgroundImage: `url("${book.imageLinks.thumbnail}")`
					}}>
				</div>
				<div className="book-shelf-changer">
					<ShelfChanger book={book} onChangeShelf={onChangeShelf} />
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors && book.authors.join(', ')}</div>
		</div>
	)
}

Book.defaultProps = {
	width: 128,
	height: 188
}

Book.propTypes = {
	book: PropTypes.object,
	width: PropTypes.number,
	height: PropTypes.number,
	onChangeShelf: PropTypes.func.isRequired
}

export default Book