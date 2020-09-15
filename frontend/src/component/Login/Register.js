import React, { Component } from 'react';
import user_actions from "../../store/actions/user_actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Register extends Component{

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address1:'',
            address2:'',
            pincode:'',
            password: '',
            passwordConfirmation: '',
            errors: [],
        };

    }

    dispalyErrors = errors =>
        errors.map((error, i) => <p key={i}> {error} </p>)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    isFormvalid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message: "fill the form "};
            this.setState({errors : errors.concat(error) })
        } 
        else if (!this.isPasswordValid(this.state)){
            error = {message : 'password wrong'};
            this.setState({ errors: errors.concat(error)});
        } else {
            return true;
        }
    }

    isPasswordValid = ({password, passwordConfirmation} ) => {
        if(password.length < 4 || passwordConfirmation < 4 ){
            return false;
        } else if (password !== passwordConfirmation){
            return false;
        } else  {
            return true;
        }
    }

    isFormEmpty = ({ lastname, name, address1, address2, pincode, email,password,passwordConfirmation, phone}) => {
        return(
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length ||
            !address1.length ||
            !address2.length ||
            !pincode.length ||
            !phone.length

        );
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
            name: this.state.name,
            lastname: this.state.lastname,
            address1: this.state.address1,
            address2: this.state.address2,
            pincode: this.state.pincode,
            phone: this.state.phone
        };

        if (this.isFormvalid(this.state)) {
            this.setState({ errors: [] })
            this.props.dispatch(user_actions.registerUser(dataToSubmit))
                .then(response => {
                            alert('reg suucefully',response)
                            this.props.history.push('/login2')
                          
                } 
            )
            .catch(err => {
                alert("Sorry! reg failed")
                console.log(err) 
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            })
        }
        else {
            console.error('form not valid')
            alert('Fill all the details')
            this.setState({
                errors: this.state.errors.concat('Fill all the details')
            })
           
        }
    }



    render(){
                console.log('reg page',this);

        return(
            <div className="container login-box">
                <h2>Sign Up</h2>
                <div className='row'>
                    <form className='col-12' >

                        
                        <div className='row'>
                            <div className='input-feild col s6'>
                                <label htmlFor="name">First name</label>
                                <input
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className='validate'
                                />

                                <span
                                    className='helper-text'
                                    data-error='type a right name'
                                    data-success='right'
                                />

                            </div>
                            <div className='input-feild col s6'>
                                <label htmlFor="lastname">Last name</label>
                                <input
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className='validate'
                                />

                                <span
                                    className='helper-text'
                                    data-error='type a right lastname'
                                    data-success='right'
                                />

                            </div>
                            
                        </div>

                        
                        <div className='row'>
                            <div className='input-feild col s12'>
                                <label className='active' htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className='validate'
                                />

                                <span
                                    className='helper-text'
                                    data-error='type a right email'
                                    data-success='right'
                                />

                            </div>

                        </div>
                        <div className='row'>
                            <div className='input-feild col s12'>
                                <label className='active' htmlFor="phone">Phone number</label>
                                <input
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={e => this.handleChange(e)}
                                    id="phone"
                                    type="tel"
                                    className='validate'
                                    required='required'
                                />

                                <span
                                    className='helper-text'
                                    data-error='type a right phone'
                                    data-success='right'
                                />

                            </div>

                        </div>
                            <h5>Address</h5>
                        <div className='row'>
                            <div className='input-feild col s5'>
                                <label className='active' htmlFor="address1">Address Line 1</label>
                                <input
                                    name="address1"
                                    value={this.state.address1}
                                    onChange={e => this.handleChange(e)}
                                    id="address1"
                                    type="text"
                                    className='validate'
                                />
                            </div>
                            <div className='input-feild col s5'>
                                <label htmlFor="address2">Address Line 2(city,State)</label>
                                <input
                                    name="address2"
                                    value={this.state.address2}
                                    onChange={e => this.handleChange(e)}
                                    id="address2"
                                    type="text"
                                    className='validate'
                                />
                            </div>
                            <div className='input-feild col s2'>
                                <label htmlFor="pincode">Pin-Code</label>
                                <input
                                    name="pincode"
                                    value={this.state.pincode}
                                    onChange={e => this.handleChange(e)}
                                    id="pincode"
                                    type="number"
                                    className='validate'
                                />
                            </div>
                        </div>
                            <h5>Password</h5>
                        <div className='row'>
                            <div className='input-feild col s12'>
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className='validate'
                                />

                                <span
                                    className='helper-text'
                                    data-error='Wrong password'
                                    data-success='right'
                                />
                            </div>
                            <div className='input-feild col s12'>
                                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                                <input
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className='validate'
                                />
                               
                            </div>
                        </div>
                        

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.dispalyErrors(this.state.errors)}
                            </div>

                        )}


                        <div className='row'>
                            <div className='col s6'>
                                <button className='btn waves-effect red lighten-2'
                                    type='submit'
                                    name='action'
                                    onClick={this.submitForm}
                                >
                                    Create an account
                                </button>
                                &nbsp;
                                &nbsp;
                                <Link to='/login2'>
                                    <button className='btn waves-effect red lighten-2'
                                        type='submit'
                                        name='action'
                                    >
                                        Log- in
                                    </button>
                                </Link>
                            </div>

                        </div>


                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("state", state);
    return {
        user: state.user,
    }
}   

export default connect(mapStateToProps) (Register);