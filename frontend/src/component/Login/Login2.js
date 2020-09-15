import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import './style.css';
import 'materialize-css/dist/css/materialize.min.css';
import user_actions from "../../store/actions/user_actions";


// const Promise = global.Promise;

class Login2 extends Component {
    constructor(props){
        super(props)

            this.state = {
                email: '',
                password: '',
                errors: [],
            };
        
    }



    dispalyErrors = errors => 
        errors.map((error, i) => <p key={i}> {error} </p>)


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        if (this.isFormvalid(this.state)) {
            this.setState( { errors: [] } )
                this.props.dispatch(user_actions.loginUser(dataToSubmit))
                .then(response => {
                    console.log('res',response)
                    if (response.payload.isAuth){
                            alert('login suucefully')
                            this.props.history.push('/')
                            }

                    else {
                        alert('Failed to login... Wrong email or password')
                        this.setState({
                            errors: this.state.errors.concat(
                                "Failed to login... Wrong email or password"
                            )
                        })
                    }        
                } 
            )
            

            // try { 
            //     console.log('login',this.props)
            //     this.props.dispatch(user_actions.loginUser(dataToSubmit))
            //         if(this.props.user.loginSuccess = {loginSuccess:true} ){
            //             this.props.history.push('/')
            //         }
            //         else {
            //             this.setState({
            //                 errors: this.state.errors.concat(
            //                     "failed to login"
            //                 )
            //             })
            //         }

            // }   
            // catch(errors){
            //     console.log('errorsss',errors)
            //      this.setState({
            //                  errors: this.state.errors.concat(
            //                      "fail login"
            //                  )
            //              })
            // }
        }
        else {
            alert('Fill all the details')
            this.setState({
                errors: this.state.errors.concat('Fill all the details')
            })
        }
    }

    isFormvalid = ({email, password}) => email && password;

    

    render() {
        console.log('loginpage', this.props.user);
        return (
            <div className="container login-box">
                <h2>Log in</h2>
                <div className='row'>
                    <form className='col-12' >
                        <div className='row'>
                            <div className='input-feild col s12'>
                                <label htmlFor="email">Email</label>
                                <input 
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className='validate' 
                                    autoComplete='on'
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
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className='validate'
                                    autoComplete='on'
                                />
                                
                                <span
                                    className='helper-text'
                                    data-error='Wrong password'
                                    data-success='right'
                                />
                            </div>
                        </div>
                        
                            { this.state.errors.length > 0 && (
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
                                    Login
                                </button>
                                &nbsp;
                                &nbsp;
                                <Link to='/register'>
                                    <button className='btn waves-effect red lighten-2'
                                        type='submit'
                                        name='action'
                                    >
                                        Sign Up
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

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        user: state.user,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loginUser: (dataToSubmit) => {
//             dispatch(loginUser(dataToSubmit))
//         }
//     }
// }

export default connect(mapStateToProps, null) (Login2);