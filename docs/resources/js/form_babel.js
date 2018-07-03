
class InputForm extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		// Loop over them and prevent submission
		var input = document.querySelector("#input")
		var validation = Array.prototype.filter.call(input, function(form) {
			input.addEventListener('submit', function(event) {
				if (input.checkValidity()===false) {
					console.log("check validity "+input.checkValidity())
					event.preventDefault()
					event.stopPropagation()
				}
				input.classList.add('was-validated')
			}, true)
		})
	}
	render(){ return (
		<form id="input" className="needs-validation" action="./" method="get">
			<div className="form-group">
				<label htmlFor="radius">Radius</label>
				<div className="input-group">
					<input required="required" type="number" step="1e-99" min="0" name="radius" id="radius" className="form-control" />
					<select name="radius_unit" className="form-control">
						<option value="m">m</option>
						<option value="cm">cm</option>
					</select>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="length">Length</label>
				<div className="input-group">
					<input required="required" type="number" step="1e-99" min="0" name="length" id="length" className="form-control" />
					<select name="length_unit" className="form-control">
						<option value="m">m</option>
						<option value="cm">cm</option>
					</select>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="width">Width</label>
				<div className="input-group">
					<input required="required" type="number" step="1e-99" min="0" name="width" id="width" className="form-control" />
					<select name="width_unit" className="form-control">
						<option value="m">m</option>
						<option value="cm">cm</option>
					</select>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="height">Height</label> 
				<div className="input-group">
					<input required="required" type="number" step="1e-99" min="0" name="height" id="height" className="form-control" />
					<select name="height_unit" className="form-control">
						<option value="m">m</option>
						<option value="cm">cm</option>
					</select>
				</div>
			</div>
			<div className="div-button">
				<input type="submit" className="btn" value="Calculate" />
				<input type="reset" className="btn" value="Reset" />
			</div>
		</form>)
	}
}

/******************************************/

class OutputForm extends React.Component {
	constructor(props){
		super(props)
		this.main = document.querySelector(".main")
		this.result = this.props.result
		this.resultTable = this.resultTable.bind(this)
		this.radius = this.props.urlList.radius+this.props.urlList.radius_unit
		this.length = this.props.urlList.length+this.props.urlList.length_unit
		this.width = this.props.urlList.width+this.props.urlList.width_unit
		this.height = this.props.urlList.height+this.props.urlList.height_unit
		this.infoTable = this.resultTable()
	}
	componentDidMount(){
		document.querySelector("#retry").addEventListener('click', function() {
			//this.main value cannot be used in the target container indicated below
			ReactDOM.render(<InputForm />,document.querySelector(".main"))
		}, true)
	}

	//use to print the resultant data onto a table
	resultTable(){
		var htmlContent = this.result.map(function(item){return(
			<tr>
				<td>{item["method"]}</td>
				<td>{item["theory"]}</td>
				<td>{item["model"]}</td>
			</tr>
		)})
		return (<tbody>{htmlContent}</tbody>)
	}

	render(){return (
		<div id="output">
			<div className="output_result">
				<h4>Input Parameters</h4>
				<div>Radius of shperes: {this.radius}</div>
				<div>Dimension of container: {this.length} × {this.width} × {this.height}</div>
				<hr/>
				<h4>Results by methods</h4>
				<table>
					<thead>
						<tr>
							<th>Calculation method</th>
							<th>Value by theory</th>
							<th>Value by simulation</th>
						</tr>
					</thead>
					{this.infoTable}
				</table>
				
				<div>By simulation calculation, {this.result[0].name} results in maximum capacity of the container.</div>
				<div>The maximum capacity of the container is {this.result[0].model} sphere(s).</div>
			</div>
			<div className="div-button">
				<input type="button" id="retry" className="btn" value="Retry" />
			</div>
		</div>
	)}
}


/******************************************/

class ErrorForm extends React.Component {
	constructor(props){
		super(props)
		this.main = document.querySelector(".main")
		this.result = this.props.result
		this.urlList  = this.props.urlList
		this.noResult = this.noResult.bind(this)
		this.radius = this.urlList.radius+this.urlList.radius_unit
		this.length = this.urlList.length+this.urlList.length_unit
		this.width = this.urlList.width+this.urlList.width_unit
		this.height = this.urlList.height+this.urlList.height_unit
		if(this.result.warning ==1){
			this.infoTable = this.noResult(1)
		}
		if(this.result.warning ==0){
			this.infoTable = this.noResult(0)
		}
	}
	componentDidMount(){
		document.querySelector("#retry").addEventListener('click', function() {
			//this.main value cannot be used in the target container indicated below
			ReactDOM.render(<InputForm />,document.querySelector(".main"))
		}, true)
	}
	noResult(e){
		if(e==1){return (
			<h4>No spheres can be stored because of limited space. Simulation Terminated.</h4>
		)} else if (e==0){return(
			<h4>Invalid radius. Simulation Terminated.</h4>
		)}
	}
	render(){return (
		<div id="output">
			<div className="output_result">
				<h4>Input Parameters</h4>
				<div>Radius of shperes: {this.radius}</div>
				<div>Dimension of container: {this.length} × {this.width} × {this.height}</div>
				<hr/>
				{this.infoTable}
			</div>
			<div className="div-button">
				<input type="button" id="retry" className="btn" value="Retry" />
			</div>
		</div>
	)}
}

