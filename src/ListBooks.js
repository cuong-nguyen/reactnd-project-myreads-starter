import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
	state = {
		readingBooks: [],
		wantToReadBooks: [],
		readBooks: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			const readingBooks = []
			const wantToReadBooks = []
			const readBooks = []

			books.forEach(book => {
				if (book.shelf === 'currentlyReading') {
					readingBooks.push(book)
				} else if (book.shelf === 'read') {
					readBooks.push(book)
				} else if (book.shelf === 'wantToRead') {
					wantToReadBooks.push(book)
				}
			})

			this.setState({ readingBooks, wantToReadBooks, readBooks })
		})
	}

	render() {
		const { readingBooks, wantToReadBooks, readBooks } = this.state

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelf shelf="Currently Reading" books={readingBooks} />
						<BookShelf shelf="Want to Read" books={wantToReadBooks} />
						<BookShelf shelf="Read" books={readBooks} />
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks