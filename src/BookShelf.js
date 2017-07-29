import React from 'react'
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
						<li key={book.industryIdentifiers[0].identifier}>
							<Book
								book={book}
								shelf={book.shelf}
								title={book.title}
								author={book.authors.join(', ')}
								bookCoverUrl={book.imageLinks.smallThumbnail}
								onChangeShelf={onChangeShelf}
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}

export default BookShelf