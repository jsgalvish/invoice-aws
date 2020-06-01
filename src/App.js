import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
	state = {
		isLoading: true,
		invoices: [],
	}

	remove(id){
		let updatedInvoice = [...this.state.invoices].filter (i => i.id !== id)
		this.setState({invoices: updatedInvoice});
	}

	async componentDidMount(){
		const response = await fetch('https://yn5n3b2iz0.execute-api.us-east-1.amazonaws.com/Dev');
		const body = await response.json();
		this.setState({invoices: body, isLoading:false })
	}

	render() {
		const isLoading = this.state.isLoading;
		const allInvoices = this.state.invoices;

		if (isLoading)
			return(<div>Loading...</div>);

		let invoices = allInvoices.map( invoice =>
			<tr key={invoice.id}>
				<td>{invoice.Vendor} </td>
				<td>{invoice.Amount}</td>
				<td>{invoice.Invoice}</td>
				<td>{invoice.Date}</td>
				<td><Button className="btn btn-lg btn-dark" onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faThumbsUp}/> OK </Button> </td>
			</tr>
		);

		return (
			<div className="container border border-secondary rounded center mt-4 bg-white">
				<div className="row">
					<div className="col-12 text-center m-2">
						<h4>Pending Invoices </h4>
					</div>
				</div>

				<div className="row">
					<div className="col-12 center text-center">
						<Table responsive bordered hover>
							<thead className="thead-dark">
								<tr>
									<th scope="row">Vendor</th>
									<th>Amount</th>
									<th>Invoice #</th>
									<th>Date</th>
									<th colSpan="1">Action</th>
							</tr>
							</thead>
							<tbody>
								{ this.state.invoices.length === 0 ? <td colSpan="5"> All caught up!</td> : invoices }
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

export default App;