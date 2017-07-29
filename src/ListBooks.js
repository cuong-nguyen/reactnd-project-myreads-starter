import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import Loading from './Loading'
import sortBy from 'sort-by'

const filterAndSortBooks = (books, shelf, field = 'title') => {
	const filteredBooks = books.filter(book => book.shelf === shelf)
	return filteredBooks.sort(sortBy(field))
}

const ListBooks = ({ loaded, books, onChangeShelf }) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				{loaded ? (
					<div>
						<BookShelf
							shelf="Currently Reading"
							books={filterAndSortBooks(books, 'currentlyReading')}
							onChangeShelf={onChangeShelf}
						/>
						<BookShelf
							shelf="Want to Read"
							books={filterAndSortBooks(books, 'wantToRead')}
							onChangeShelf={onChangeShelf}
						/>
						<BookShelf
							shelf="Read"
							books={filterAndSortBooks(books, 'read')}
							onChangeShelf={onChangeShelf}
						/>
					</div>
				) : <Loading />}
			</div>
			<div className="open-search">
				<Link to='/search'>Add a book</Link>
			</div>
		</div>
	)
}

ListBooks.propTypes = {
	loaded: PropTypes.bool.isRequired,
	books: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks