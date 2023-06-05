import React from 'react'
import * as Papa from 'papaparse';

class FileInput extends React.Component<any, any> {
  constructor(prop:any) {
    super(prop);
    this.state = {
      csvfile: undefined
    };
    this.uploadData = this.uploadData.bind(this);
  }

  handleChange = (event:any) => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.uploadData,
      header: true
    });
  };

  async uploadData(result:any) {
    var data = result.data;
    console.log(data);
    const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`},
			body: JSON.stringify({ data: data }),
		};
		const resp = await fetch("http://127.0.0.1:8080/api/tranx/upload", requestOptions);
		var data = await resp.json();
		console.log('????????',data.msg);
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <h2 style={{ color: '#AEAEAE', textDecoration: 'none' }}>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          name="file"
          placeholder={""}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
      </div>
    );
  }
}

export default FileInput;
