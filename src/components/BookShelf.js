import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ shelf, books, icon, onChangeShelf }) => {

	if (books.length === 0) {
		return null
	}

	return (
		<div className="bookshelf">
			<div className="bookshelf-books">
				<div className="bookshelf-title">
					<i className={`fa ${icon}`} aria-hidden="true"></i>
					{' '}
					{shelf}
				</div>
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

BookShelf.defaultProps = {
	icon: 'fa-book'
}

BookShelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired,
	icon: PropTypes.string
}

export default BookShelf