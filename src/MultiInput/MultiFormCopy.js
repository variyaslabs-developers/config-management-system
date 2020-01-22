import React, { Component } from 'react';
// import Result from './Result'
import {Container, Row, Col, Button,Table} from 'react-bootstrap';



//
//TODO: 
// 1: API call for fetching exiting data "GET"
// 2: API call for sending modified and new Data "POST" and it should return success status.

class MultiForm extends Component{
   fileReader;
  state = {
     inputAdd: [
      {
        camera : '',
        name : '',
        email: '',
        phone: ''
      }
    ] ,
    csvdata:[] ,
    show:false,
  }

  componentDidMount(){
    this.handleFile();
  }

  handleAddData = () => {
    this.setState({
      inputAdd: this.state
                    .inputAdd.concat([{ 
                     
                      camera : '',
                      name : '',
                      email: '',
                      phone: '' }]),
    });
  };

   handleFile = () => {
     console.log('hi')
     this.setState({inputAdd: [
      {
        camera : '',
        name : '',
        email: '',
        phone: ''
      }]
    })
    this.setState({csvdata: []})
     fetch('http://localhost:5000/csv/', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => 
      {
       return response.json() // << This is the problem
      })
    .then((responseData) => { // responseData = undefined

        console.log(responseData.data);
        var data = [];
        var rows = responseData.data.split("\n");
        
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          data.push( cells );
        }
        console.log(data)
        for (var j = 1; j < data.length-1; j++) {
          // console.log(data[0].length);
          this.state
          .csvdata.push({ 
           
            camera : data[j][0],
            name : data[j][1],
            email: data[j][2],
            phone: data[j][3] })
            
           }
           this.setState({
             inputAdd:this.state.csvdata
           });
     }).catch((err) =>{
        console.log(err);
      })
     // const content = e;
/*       console.log(e.target.result);
      var data = [];
var rows = e.target.result.split("\n");

for (var i = 0; i < rows.length; i++) {
  var cells = rows[i].split(",");
  data.push( cells );
}
//console.log(data)
for (var j = 0; j < data.length-1; j++) {
 // console.log(data[0].length);
 this.state
 .csvdata.push({ 
  
   camera : data[j][0],
   name : data[j][1],
   email: data[j][2],
   phone: data[j][3] })
   
  }
  this.setState({
    inputAdd:this.state.csvdata
  }); */
// console.log(this.state.inputAdd[1][0].camera);
 //console.log(this.state.inputAdd)
  /* this.setState({
    inputAdd: this.state
                  .inputAdd.concat([{ 
                   
                    camera : data[i],
                    name : data[i+1],
                    email: data[i+],
                    phone: data[i] }])
  }); */

      // … do something with the 'content' …


  };

  /*  handleFileChosen = (file) => {
      const fileReader = new FileReader();
      fileReader.onloadend = this.handleFileRead;
      fileReader.readAsText(file);
  }; */

  handleShareholderCameraChange = idx => evt => {
    const newShareholders = this.state.inputAdd.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, camera: evt.target.value };
    });

    this.setState({ inputAdd: newShareholders });
  };
  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.inputAdd.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ inputAdd: newShareholders });
  };
  handleShareholderPhoneChange = idx => evt => {
    const newShareholders = this.state.inputAdd.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, phone: evt.target.value };
    });

    this.setState({ inputAdd: newShareholders });
  };
  handleShareholderEmailChange = idx => evt => {
    const newShareholders = this.state.inputAdd.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, email: evt.target.value };
    });

    this.setState({ inputAdd: newShareholders });
  };
  handleSubmit = evt => {
    console.log(this.state.inputAdd);
    fetch('http://localhost:4999/writecsv/', {
      method: 'post',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(this.state.inputAdd)
    })
    .then((response) => 
      {
       return response.json() // << This is the problem
      })
    .then((responseData) => {console.log(responseData)
    this.setState({inputAdd: [
      {
        camera : '',
        name : '',
        email: '',
        phone: ''
      }]
    })
    this.setState({csvdata: []})
    console.log(this.state.csvdata);
    if(responseData.message==='success'){
      window.location.reload();
    }
    if(responseData.message==='failure'){
      this.setState({show:true});
    }
    })
    .catch((err) =>{
      console.log(err);
    })
  };
  handleRemoveData = idx => () => {
    this.setState({
      inputAdd: this.state.inputAdd.filter((s, sidx) => idx !== sidx)
    });
  };
handleEditData = ()=>{
/*   if(this.state.disable){
    this.setState({
      disable: false
    });
  } else {
    this.setState({
      disable: true
    });
  } */
 
}
 


  

  render(){
    return(
    <section className="middlePart">
        <Container>
        {/* <div className='upload-expense'>
         <input type='file'
               id='file'
               className='input-file'
               accept='.csv'
               onChange={e => this.handleFileChosen(e.target.files[0])}
        />
        <Button onClick={this.handleFile} variant="success">Choose File</Button>
        </div> */}
        { this.state.show ? <h1>Some error occoured..please refresh the browser...</h1> : null }  
          <Table striped bordered>
            <thead>
              <tr>
                
                <th>Camera Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th></th>
              
              </tr>
            </thead>
            <tbody>
             
            {this.state.inputAdd.map((data, id) => (
                  <tr>
                  <td><input  onChange={this.handleShareholderCameraChange(id)} type="text" class="form-control" placeholder="Camera Id" value={data.camera} /></td>
                  <td><input onChange={this.handleShareholderNameChange(id)} type="text" class="form-control" placeholder="Name" value={data.name} /></td>
                  <td><input onChange={this.handleShareholderEmailChange(id)} type="text" class="form-control" placeholder="Email" value={data.email}/></td>
                  <td><input onChange={this. handleShareholderPhoneChange(id)} type="text" class="form-control" placeholder="Phone No" value={data.phone}/></td>
                  {/* <td><Button variant="primary" onClick={this.handleEditData}>Edit</Button></td>  */}
                  <td><Button variant="primary" onClick={this.handleRemoveData(id)}>Delete</Button></td>                
                </tr>
      
      ))}

            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <div className="tdSubmit">
                   <Button variant="primary" onClick={this.handleAddData}>Add More</Button>
                   <Button onClick={this.handleSubmit} variant="success">Save Data</Button> 
                  </div>  
                </td>  
               
              </tr>
            </tfoot>
          </Table>

          {/* </> */}

        </Container>
    </section>
  );
}
}
// https://www.youtube.com/watch?v=zifE_wnwnJ8
//https://codepen.io/benhoyle/pen/vyygYN?editors=1010
export default MultiForm;