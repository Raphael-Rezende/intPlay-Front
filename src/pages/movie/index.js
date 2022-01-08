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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import { getDataStringFormat } from '../../components/Utils/DateTimeUtil';


 class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            search: '',
            anchorEl: null,
            open: false
        }
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
    }
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget, open: true });
    };
    handleClose = () => {
        this.setState({ anchorEl: null, open: false });
    };
    redirect = (route) => {
        //console.log(quest)


        this.props.history.push({
            pathname: route,
        });


    }
    render() {
        const { search, data, open, anchorEl } = this.state;
        return (
            <div>
                <Header />
                <div id="wrapper" style={{ padding: 100 }}>
                    <div id="content-wrapper">
                        <div className="container-fluid">

                            <div className="card mb-3" style={{ backgroundColor: '#111' }}>
                                <div className="card-header" style={{ backgroundColor: '#1976D2' }}>
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
                                            <Button
                                                id="basic-button"
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                style={{ color: 'white' }}
                                                onClick={this.handleClick}
                                            >
                                                Cadastrar
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={this.handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => this.redirect('/movie/add')}>Filme</MenuItem>
                                                <MenuItem onClick={() => this.redirect}>Serie</MenuItem>

                                            </Menu>
                                        </div>
                                    </div>

                                </div>
                                <div>

                                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {data.length > 0 ? data.map((item, index) => (

                                            <Accordion
                                                style={{ backgroundColor: 'black', color: 'white' }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"

                                                >
                                                    <Typography style={{ color: 'white' }}>{item.titulo}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>{item.sinopse}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <div className="col-sm-4">

                                                        <Typography>{getDataStringFormat(item.ano,'yyyy')}</Typography>
                                                    </div>
                                                    <div className="col-sm-4">

                                                        <Typography>{item.classificacao}</Typography>
                                                    </div>
                                                    <div className="col-sm-4">

                                                        <Typography>{item.lingua}</Typography>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>

                                        )) : <Typography>Não há dados</Typography>}
                                    </Box>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}


export default withRouter(index);