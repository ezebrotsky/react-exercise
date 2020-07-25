import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import { Slide } from 'react-slideshow-image';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { maxWidth } from '@material-ui/system';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: Number.parseInt(this.props.price),
            like: false,
            contactForm: false,
            editableTotalValue: false,
            email: '',
        };

        this.toogleLike = this.toogleLike.bind(this);
        this.editTotalVentas = this.editTotalVentas.bind(this)
        this.okTotalVentas = this.okTotalVentas.bind(this)
        this.showContacto = this.showContacto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('data'+this.props.id)) {
            const data = JSON.parse(localStorage.getItem('data'+this.props.id));
            this.setState({
                totalPrice: data.totalPrice,
                like: data.like,
            });
        }
    }

    componentDidUpdate() {
        var data = {
            totalPrice: this.state.totalPrice,
            like: this.state.like,
        }
        localStorage.setItem('data'+this.props.id, JSON.stringify(data));
    }

    toogleLike(e) {
        this.setState({ like: !this.state.like });
    }

    editTotalVentas(e) {
        if (!this.state.editableTotalValue) {
            this.setState({ editableTotalValue: true });
        }
    }

    okTotalVentas(e) {
        var value = e.target.value;
        if (!value) {
            // Si no hubo cambios
            this.setState({ editableTotalValue: false });
            return null;
        }
        if (Number.parseInt(value.replace(/\./g,'')) < 0) {
            // Si es menor a 1
            this.setState({ editableTotalValue: false });
            return null;
        }
        this.setState({ 
            totalPrice: Number.parseInt(value.replace(/\./g,'')),
            editableTotalValue: false,
        });
    }

    showContacto(e) {
        this.setState({
            contactForm: !this.state.contactForm,
            email: null,
        });
    }

    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email: email });
    }

    handleSubmit = (event) => {
        this.setState({
            contactForm: !this.state.contactForm,
            email: null,
        });
    }

    render() {
        const slideImages = this.props.images;

        const properties = {
            duration: 5000,
            transitionDuration: 500,
            arrows: true,
            onChange: (oldIndex, newIndex) => {
            }
        }
        
        const Slideshow = () => {
            return (
            <div className="slide-container">
                <Slide {...properties}>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[0]})`}}></div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[1]})`}}></div>
                    </div>
                </Slide>
            </div>
            )
        }

        const renderDestacado = () => {
            if (this.props.destacado) {
                return (
                    <span className="sticky">Super destacado</span>
                );
            }
        }

        const renderContacto = () => {
            return (
                (this.state.contactForm ?
                <div className="card" style={{width:"75%"}}>
                    <div className="formulario">
                        <h4 style={{textOverflow: 'unset', whiteSpace: 'normal'}}>Para ser contactado por favor ingrese su dirección de correo electrónico.</h4>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >
                            <TextValidator
                                label="Email"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email || ''}
                                fullWidth
                                placeholder="myemail@gmail.com"
                                validators={['required', 'isEmail']}
                                errorMessages={['Este campo es obligatorio.', 'Por favor ingrese un email válido.']}
                            />
                            <Button className="contacto" style={{marginTop: "12px"}}  type="submit">ENVIAR</Button>
                        </ValidatorForm>
                    </div>
                </div>
                :
                null
                )
            );
        }

        const renderM2Price = () => {
            var value = Math.floor(this.state.totalPrice / Number.parseInt(this.props.m2));
            return (
                <span className="m2 price"> $/m&sup2; <NumberFormat value={value} displayType={'text'} decimalSeparator={","} thousandSeparator={"."} /></span>
            );
        }

        const renderTotalValue = () => {
            return (
                (!this.state.editableTotalValue ?
                    <span>U$S <NumberFormat value={this.state.totalPrice} displayType={'text'} decimalSeparator={","}thousandSeparator={"."} />
                    {renderM2Price()}
                    </span>
                :
                <div>
                    <span>U$S </span>
                    <NumberFormat customInput={TextField} decimalSeparator={","} thousandSeparator={"."} autoFocus={true} />
                    {renderM2Price()}
                </div>
                )
            );

        }

        return (
            <React.Fragment>
                <div className="card">
                    <div className="cardImage">
                        <div className="topImage">
                            {renderDestacado()}
                            <span className="like">
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    size="2x" 
                                    onClick={this.toogleLike}
                                    color={(this.state.like) ? "red" : "black"}
                                />
                            </span>
                        </div>
                        {Slideshow()}
                        <h1 className="priceResponsive" onClick={this.editTotalVentas} onBlur={this.okTotalVentas}>
                            {renderTotalValue()}
                        </h1>
                        <ul className="listResponsive">
                            <li><NumberFormat value={this.props.m2} displayType={'text'} decimalSeparator={","}thousandSeparator={"."} /> m&sup2;</li>
                            <li>{this.props.dorms} Dormitorios</li>
                            <li>{this.props.bath} Baños</li>
                            <li>{this.props.garage} Cocheras</li>
                        </ul>
                    </div>
                    <div className="cardBody">
                        <CardContent>
                            <h4>
                                {this.props.title}
                            </h4>
                            <h5>
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> {this.props.location}
                            </h5>
                            <Typography variant="body2" color="textPrimary" component="p">
                                {this.props.description}
                            </Typography>
                            <h1 className="price" onClick={this.editTotalVentas} onBlur={this.okTotalVentas}>
                                {renderTotalValue()}
                            </h1>
                        </CardContent>
                        <div className="cardFooter">
                            <ul className="list">
                                <li><NumberFormat value={this.props.m2} displayType={'text'} decimalSeparator={","}thousandSeparator={"."} /> m&sup2;</li>
                                <li>{this.props.dorms} Dormitorios</li>
                                <li>{this.props.bath} Baños</li>
                                <li>{this.props.garage} Cocheras</li>
                            </ul>
                            <a className="contacto" href="#!" onClick={this.showContacto}>CONTACTAR</a>
                        </div>
                        <a className="contactoResponsive" href="#!" onClick={this.showContacto}>CONTACTAR</a>
                    </div>
                </div>
                <br />
                {renderContacto()}
            </React.Fragment>
        );
    }
}

export default Card;
