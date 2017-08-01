import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import BookShelfChanger from './BookShelfChanger'

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
				<BookShelfChanger books={[book]} onChangeShelf={onChangeShelf} />
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