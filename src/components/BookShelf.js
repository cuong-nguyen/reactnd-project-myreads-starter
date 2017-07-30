import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ shelf, books, onChangeShelf }) => {

	if (books.length === 0) {
		return null
	}

	return (
		<div className="bookshelf">
			<h3 className="bookshelf-title">
				<i className="fa fa-book" aria-hidden="true"></i>
				{' '}
				{shelf}
			</h3>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map(book => (
						<li key={book.id}>
							<Book book={book} onChangeShelf={onChangeShelf} />
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}

BookShelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf