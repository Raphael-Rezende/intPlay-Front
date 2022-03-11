import React, { Component } from 'react'

import api from "../../services/http-common";
import { Link, withRouter } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "../../elements/header";
import { TextField } from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import EasyEdit, { Types } from 'react-easy-edit';

import {
    Botao,
    Input,
    Label,
    Container,
    HelperText,
    ModalCustomizad,
    Title,
    Select,
    Warning
} from './styles';

import { estilo } from '../../components/Style/Style'

import Box from '@mui/material/Box';
import { getDataStringFormat } from '../../components/Utils/DateTimeUtil';

const styles = {
    root: {
        background: "black"
    },
    cssLabel: {
        color: "#fff"
    },
    input: {
        color: "#1430f0"
    }
};

class index extends Component {
    constructor(props) {
        super(props)
        this.ref = null
        this.state = {
            data: [],
            search: '',
            anchorEl: null,
            open: false,
            uploadedFilmes: [],
            uploadeDrop: [],
            uploadedCapa: [],
            isLoading: false,
            titulo: '',
            generos: [],
            generoSelect: [],
            sinopse: '',
            classificacao: '',
            size: '',
            duracao: '',
            ano: '',
            capa: '',
            backdrop: '',
            url: '',
            modalVisible: false,
            generoInput: '',
            msgServidor: '',
            server: [],
            serverInput: '',
            serverSelect: '',
            modalVisibleServer: false,
            returnServer: false,
            alert: false
        }
    }

    handleChangeSelect = (event) => {

        const values = event.target.value.split(',')

        const { movie, capa, backdrop } = this.state;


        if (movie || capa || backdrop) {
            this.setState({ alert: true })
            this.ref.value = this.state.serverSelect
        } else {

            this.setState({ serverSelect: values[1], serverID: values[0] })
        }

    }
    getServer = () => {
        api.get("servers")
            .then(response => {
                if (response.status === 200) {
                    const server = response.data;
                    this.setState({ server: server })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    fetchData = () => {
        api.get('/movies')
            .then(response => {
                const movies = response.data
                this.setState({ data: movies })
            })
            .catch(error => {

                console.log(error);

            });
    }
    componentDidMount() {
        this.fetchData()
        this.getServer()
    }
    handleClose = () => {
        this.setState({ anchorEl: null, open: false });
    };
    displayServer = (server) => {
        if (this.state.server.length > 0) {
            const clickedOption = this.state.server.find(item => item._id == server);
            if (clickedOption != undefined) {
                console.log('CLICKED', clickedOption.servidor)
                return clickedOption.servidor
            }


        }

    }

    redirect = (route) => {
        //console.log(quest)


        this.props.history.push({
            pathname: route,
        });


    }
    render() {

        const { search, data, generoSelect, uploadedCapa, uploadedFilmes, uploadeDrop, isLoading, titulo, sinopse, ano, generos, classificacao, capa, movie, backdrop } = this.state;
        const generateOptionsList = () => {
            return [
              { label: "First option", value: "one" },
              { label: "Second option", value: "two" },
              { label: "Third option", value: "three" }
            ];
          };
        return (
            <div>
                <Header />
                <div id="wrapper" style={{ padding: 100 }}>
                    <div id="content-wrapper">
                        <div className="container-fluid">

                            <Container
                                backgroundColor={estilo.corPadrao.backgroundColor}
                                borderColor={estilo.corPadrao.backgroundColorSecundary}
                                border={'2px solid red'}
                            >
                                <div className="card-header" style={{ backgroundColor: estilo.corPadrao.backgroundColor }}>

                                    <div className="row">
                                        <div className="col-sm-2">
                                            <i className="fas fa-table"></i>
                                            <Typography style={{ fontSize: 20, color: 'white' }}>Lista de Filmes</Typography>
                                        </div>
                                        <div className="col-sm-2">

                                            <Typography style={{ fontSize: 20, color: 'white' }}>Quantidade: {data.length}</Typography>
                                        </div>
                                        <div className="col-sm-4">
                                            <TextField
                                                label="Pesquisar"
                                                value={search}
                                                style={{ width: '100%' }}
                                                onChange={this.handleChangeSearch}
                                            //style={styles.selectLang}

                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <Botao
                                                onClick={() => this.redirect('/movie/add')}
                                            >
                                                Cadastrar
                                            </Botao>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: estilo.corPadrao.backgroundColor }}>

                                    <Box sx={{ width: '100%', bgcolor: estilo.corPadrao.backgroundColor }}>
                                        {data.length > 0 ? data.map((item, index) => (

                                            <Accordion
                                                style={{
                                                    backgroundColor: estilo.corPadrao.backgroundColor,
                                                    color: 'white',
                                                    borderTop: '2px solid blue',
                                                    borderTopColor: estilo.corPadrao.backgroundColorSecundary
                                                }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{ display: 'flex' }}

                                                >
                                                    <Title fontSize="1.2em" color={'white'}>{item.titulo}</Title>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className="row" style={{ alignItems: 'center' }}>
                                                        <div className="col-sm-1">
                                                            <Title fontSize="1.1em" color={'white'}>Servidor: </Title>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <EasyEdit
                                                                type={Types.SELECT}
                                                                value={this.state.serverSelect?this.state.serverSelect: this.displayServer(item.servidor)}
                                                                options={generateOptionsList()}
                                                                displayComponent={<Title  fontSize="1.1em" color="white">{this.state.serverSelect ? this.state.serverSelect : this.displayServer(item.servidor)}</Title>}
                                                                attributes={{ name: "awesome-input",style:{backgroundColor: estilo.corPadrao.backgroundColor, width:'100%'} }}
                                                                onSave={(val) => this.save(val)}
                                                                onCancel={this.cancel}
                                                                saveButtonLabel="Salvar"
                                                                cancelButtonLabel="Cancelar"

                                                            />

                                                        </div>


                                                    </div>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <div className="row" style={{ alignItems: 'center' }}>
                                                        <div className="col-sm-1">
                                                            <Title fontSize="1.1em" color={'white'}>Sinopse: </Title>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <EasyEdit
                                                                type={Types.TEXTAREA}
                                                                value={item.sinopse}
                                                                displayComponent={<Title fontSize="1.1em" color="white">{item.sinopse}</Title>}
                                                                editComponent={<Input type="textarea" color="white" backgroundColor={estilo.corPadrao.backgroundColor} value={item.sinopse} />}
                                                                onSave={(val) => this.save(val)}
                                                                onCancel={this.cancel}
                                                                saveButtonLabel="Salvar"
                                                                cancelButtonLabel="Cancelar"
                                                            //
                                                            //instructions="Star this repo!"
                                                            />

                                                        </div>


                                                    </div>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <div className="row" style={{ alignItems: 'center' }}>
                                                        <div className="col-sm-1">
                                                            <Title fontSize="1.1em" color={'white'}>Ano: </Title>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <EasyEdit
                                                                type={Types.DATE}
                                                                value={item.ano}
                                                                onSave={(val) => this.save(val)}
                                                                onCancel={this.cancel}
                                                                saveButtonLabel="Salvar"
                                                                cancelButtonLabel="Cancelar"
                                                                attributes={{ name: "awesome-input", style: { color: 'black' } }}
                                                            //instructions="Star this repo!"
                                                            />

                                                        </div>


                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>

                                        )) : <Typography>Não há dados</Typography>}
                                    </Box>
                                </div>
                            </Container>
                        </div>

                    </div>
                </div>
            </div >

        )
    }
}
index.propTypes = {
    classes: PropTypes.object.isRequired
};
const style = withStyles(styles)
const IndexMovie = withRouter(index, style)
export default (IndexMovie);