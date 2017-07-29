import React from 'react'
import Book from './Book'

const BookShelf = (props) => {
	const { shelf, books } = props

	if (books.length === 0) {
		return null
	}

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">
				<i className="fa fa-book" aria-hidden="true"></i>
				{' '}
				{shelf}
			</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map(book => (
						<li key={book.industryIdentifiers[0].identifier}>
							<Book
								title={book.title}
								author={book.authors.join(', ')}
								bookCoverUrl={book.imageLinks.smallThumbnail}
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}

export default BookShelf