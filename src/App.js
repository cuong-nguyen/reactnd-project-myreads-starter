import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBook from './AddBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

const BooksApp = (props) => {
	return (
		<div className="app">
			<Route exact path="/" component={ListBooks} />
			<Route path="/search" component={AddBook} />
		</div>
	)
}

export default BooksApp
