import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
	state = {
		loaded: false,
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then(books => {
				const currentShelves = this.state.shelves

				books.forEach(book => currentShelves[book.shelf].push(book))

				this.setState({ shelves: currentShelves, loaded: true })
			})
			.catch(err => {
				this.setState({ loaded: true })
			})
	}

	changeShelf = (book, newShelf) => {
		BooksAPI.update(book, newShelf)
			.then(() => {
				this.setState(prevState => {
					const currentShelves = prevState.shelves
					const updatedShelves = {
						[book.shelf]: currentShelves[book.shelf].filter(b => b.title !== book.title),
						[newShelf]: currentShelves[newShelf].concat(Object.assign({}, book, { shelf: newShelf }))
					}

					return { shelves: Object.assign({}, currentShelves, updatedShelves) }
				})
			})
	}

	render() {
		const { loaded, shelves: { currentlyReading, wantToRead, read } } = this.state

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
								books={currentlyReading}
								onChangeShelf={this.changeShelf}
							/>
							<BookShelf
								shelf="Want to Read"
								books={wantToRead}
								onChangeShelf={this.changeShelf}
							/>
							<BookShelf
								shelf="Read"
								books={read}
								onChangeShelf={this.changeShelf}
							/>
						</div>
					) : 'Loading'}
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks