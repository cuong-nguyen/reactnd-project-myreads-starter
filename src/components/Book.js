import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Rating from './Rating'

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

const Book = ({ book, width, height, onChangeShelf }) => {
	return (
		<div className="book">
			<div className="book-top">
				<Link to={{ pathname: `/details/${book.id}`, state: book }}>
					<span className="book-cover"
						style={{
							width,
							height,
							backgroundImage: `url("${book.imageLinks.thumbnail}")`
						}}>
					</span>
				</Link>
				<BookShelfChanger book={book} onChangeShelf={onChangeShelf} />
			</div>
			<div className="book-title">{book.title}</div>
			{book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
			<Rating stars={book.averageRating} totalRatings={book.ratingsCount || 0} />
		</div >
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