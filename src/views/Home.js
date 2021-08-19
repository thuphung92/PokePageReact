import React, { Component } from 'react'
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {Table} from 'react-bootstrap'

const pokeFormSchema = Yup.object().shape({
    "name": Yup.string().required()
});

const initialFormValue={
    name:''
};

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            pokeInfo:{},
            badName:false
        }
    };

    handleSubmit=({name})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res=>res.json())
            .then(data => {
                let pokeData = {}
                pokeData['image'] = data.sprites.other.dream_world.front_default;
                pokeData['name'] = data.name;
                pokeData['ability'] = data.abilities[0].ability.name;
                pokeData['experience'] = data.base_experience;
                this.setState({
                    pokeInfo: pokeData,
                    badName: false
                },() => console.log(this.state.pokeInfo))
            })
            .catch(error=>{ this.setState({badName:true}); console.error(error); })
    }

    render() {

        const styles ={
            h1:{
                textAlign: 'center',
                paddingTop: '100px',
                paddingBottom: '80px'
            },

            button:{
                marginTop: '5px',
                marginBottom: '50px'
            },

            form:{
                paddingLeft: '200px',
                paddingRight: '200px'
            },

            table:{
                textAlign: 'center',
                justifyContent: 'center',
                verticalAlign: 'middle',
            },

        }

        return (
            <div>
                <h1 style={styles.h1}>Pokemon Information</h1>
                {this.state.badName ? <small style={{color:"red", paddingLeft: '200px'}}>Invalid Pokemon Name</small>:""}
                <Formik initialValues={initialFormValue}
                        validationSchema={pokeFormSchema}
                        onSubmit={(values,{resetForm}) =>{
                            this.handleSubmit(values);
                            resetForm(initialFormValue)
                        }}
                >
                {({errors,touched}) =>(
                    <Form style={styles.form}>
                        <label htmlFor="pokeName" className="form-label">Enter Your Pokename</label>
                        <Field name="name" className="form-control"/>
                        {errors.name && touched.name ? (<div style={{color:'red'}}>{errors.name}</div>):null}

                        <button style={styles.button} type="submit" className="btn btn-primary">Search</button>
                    </Form>
                )}     
                </Formik>
                {Object.entries(this.state.pokeInfo).length?
                <Table responsive striped bordered hover style={styles.table}>
                    <thead>
                        <tr>
                        <th>Pokemon</th>
                        <th>Name</th>
                        <th>Ability</th>
                        <th>Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={this.state.pokeInfo.name}>
                            <td><img src={this.state.pokeInfo.image} style={styles.img}/></td>
                            <td>{this.state.pokeInfo.name}</td>
                            <td>{this.state.pokeInfo.ability}</td>
                            <td>{this.state.pokeInfo.experience}</td>
                        </tr>
                    </tbody>
                </Table>
                :''}
                
            </div>

            
        )
    }
}
