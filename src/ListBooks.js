import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import Loading from './Loading'

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
							books={books.filter(book => book.shelf === 'currentlyReading')}
							onChangeShelf={onChangeShelf}
						/>
						<BookShelf
							shelf="Want to Read"
							books={books.filter(book => book.shelf === 'wantToRead')}
							onChangeShelf={onChangeShelf}
						/>
						<BookShelf
							shelf="Read"
							books={books.filter(book => book.shelf === 'read')}
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

export default ListBooks