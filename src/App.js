import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
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

	handleChangeShelf = (book, newShelf) => {
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
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => <ListBooks {...this.state} onChangeShelf={this.handleChangeShelf} />}
				/>
				<Route path="/search" component={SearchBook} />
			</div>
		)
	}
}

export default BooksApp
