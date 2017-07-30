import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Rating from './Rating'
import * as BooksAPI from '../utils/BooksAPI'

class Details extends Component {
	static defaultProps = {
		width: 128,
		height: 188
	}

	state = {
		loading: false,
		book: this.props.location.state
	}

	componentDidMount() {
		if (!this.state.book) {
			// fetch book from remote if empty
			const { id: bookId } = this.props.match.params
			this.setState({ loading: true })

			BooksAPI
				.get(bookId)
				.then(book => {
					this.setState({ book, loading: false })
				})
				.catch(err => {
					this.setState({ loading: false })
				})
		}
	}

	render() {
		const { book, loading } = this.state
		console.log(book)
		const { width, height } = this.props

		return (
			<div className="list-books">
				{loading && <Loading />}
				{book && (
					<div>
						<div className="list-books-title">
							<Link to="/" className="back-link">Back</Link>
							<h1>MyReads</h1>
						</div>
						<div className="book-detail">
							<p>{book.title}</p>
							<div className="book-info">
								<div className="book-cover" style={{
									width,
									height,
									backgroundImage: `url("${book.imageLinks.thumbnail}")`
								}}>
								</div>
								<ul>
									<li>
										<Rating stars={book.averageRating} totalRatings={book.ratingsCount || 0} />
									</li>
									<li>
										<i className="fa fa-users" aria-hidden="true"></i>
										{book.authors.join(', ')}
									</li>
									<li>
										<i className="fa fa-book" aria-hidden="true"></i>
										{book.industryIdentifiers.map(isbn => isbn.identifier).join(', ')}
									</li>
									<li>
										<i className="fa fa-calendar-o" aria-hidden="true"></i>
										{book.publishedDate}
									</li>
									<li>
										<i className="fa fa-file-text-o" aria-hidden="true"></i>
										{book.pageCount} pages
									</li>
									<li>
										<i className="fa fa-external-link" aria-hidden="true"></i>
										<a href={`${book.previewLink}`} target="_blank">More...</a>
									</li>
								</ul>
							</div>

						</div>
					</div>
				)}
			</div>
		)
	}
}

export default withRouter(Details)