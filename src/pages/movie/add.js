import React, { Component } from "react";
//import MovieDataService from "../../services/movie.service";

import api from "../../services/http-common";

import Upload from "../../components/Upload/index"
import Header from "../../elements/header";
import FileList from "../../components/FileList/index"

import { uniqueId } from 'lodash';

import filesize from 'filesize';

import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Generos } from '../../components/Utils/ExportArray'
import getBlobDuration from 'get-blob-duration'

import { Types } from '../../components/Utils/Types'

const styles = {
  root: {
    background: "black"
  },
  cssLabel: {
    color: "#fff"
  },
  input: {
    color: "#1976D2"
  }
};

class AddMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      idMovie: '',
    };
  }
  handleChangeTitulo = (event) => {
    this.setState({ titulo: event.target.value })
  }
  handleChangeSinopse = (event) => {
    this.setState({ sinopse: event.target.value })
  }
  handleChangeClassificacao = (event) => {
    this.setState({ classificacao: event.target.value })
  }

  handleCheck(event, x) {


    this.setState(state => ({
      generoSelect: state.generoSelect.includes(x)
        ? state.generoSelect.filter(c => c !== x)
        : [...state.generoSelect, x]
    }));

  }
  postGenero = () => {
    Generos.map(item => {
      let bodyFormData = {
        genero: item.label,
      }
      api.post("/generos/incluir", bodyFormData)
        .then(res => {
          console.log('POST Genero', res.data)
        })
        .catch(err => {
          window.alert(err)
        })
    })
    setTimeout(this.getGenero(), 3000)

  }

  getGenero = () => {
    api.get("generos")
      .then(response => {
        if (response.status === 200) {
          const generos = response.data;
          if (generos.length < Generos.length) {
            this.postGenero()
          }
          this.setState({ generos: generos })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getGenero()
  }
  handleUpload = (files, name) => {


    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));


    // eslint-disable-next-line default-case
    switch (name) {
      case Types.movie: {

        this.setState({
          uploadedFilmes: this.state.uploadedFilmes.concat(uploadedFiles)
        });
        uploadedFiles.forEach(file => this.processUpload(file, name));
        break;
      }
      case Types.capa: {
        this.setState({
          uploadedCapa: this.state.uploadedCapa.concat(uploadedFiles)
        });
        uploadedFiles.forEach(file => this.processUpload(file, name));
        break;
      }
      case Types.backdrop: {

        this.setState({
          uploadeDrop: this.state.uploadeDrop.concat(uploadedFiles)
        });
        uploadedFiles.forEach(file => this.processUpload(file, name));

        break;
      }
    }

    //uploadedFiles.forEach(file => this.processUpload(file, name));
  };

  updateFile = (name, id, data) => {
    // eslint-disable-next-line default-case
    switch (name) {
      case Types.movie: {
        this.setState({
          uploadedFilmes: this.state.uploadedFilmes.map(uploadedFilmes => {
            return id === uploadedFilmes.id
              ? { ...uploadedFilmes, ...data }
              : uploadedFilmes;
          })
        });
        break;
      }
      case Types.capa: {
        this.setState({
          uploadedCapa: this.state.uploadedCapa.map(uploadedCapa => {
            return id === uploadedCapa.id
              ? { ...uploadedCapa, ...data }
              : uploadedCapa;
          })
        });

        break;
      }
      case Types.backdrop: {

        this.setState({
          uploadeDrop: this.state.uploadeDrop.map(uploadeDrop => {
            return id === uploadeDrop.id
              ? { ...uploadeDrop, ...data }
              : uploadeDrop;
          })
        });
        break;
      }
    }

  };


  processUpload = (uploadedFile, name) => {
    const data = new FormData();

    data.append(name, uploadedFile.file, uploadedFile.name);

    api
      .post("/movie/incluirFiles", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(name, uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {

        this.updateFile(name, uploadedFile.id, {
          uploaded: true,
          url: response.data
        });
        // eslint-disable-next-line default-case
        switch (name) {
          case Types.capa: {
            this.setState({ capa: response.data, size: uploadedFile.readableSize })
            break
          }
          case Types.backdrop: {
            this.setState({ backdrop: response.data, size: uploadedFile.readableSize })
            break
          }
          case Types.movie: {
            this.setState({ url: response.data, size: uploadedFile.readableSize })

            getBlobDuration(uploadedFile.file)
              .then((duration) => {
                this.setState({ duracao: duration })
              })
              .catch(err => {
                console.log('erro de audio duration', err)
              })
            break;
          }
        }
      })
      .catch(() => {
        this.updateFile(name, uploadedFile.id, {
          error: true
        });
      });
  };

  handleDelete = async id => {
    await api.delete(`movies/${id}`);

    this.setState({
      uploadedCapa: this.state.uploadedCapa.filter(file => file.id !== id)
    });
  };

  componentWillUnmount() {
    this.state.uploadedCapa.forEach(file => URL.revokeObjectURL(file.preview));
  }
  handleSubmit = () => {
    this.setState({ isLoading: true });

    try {


      const { titulo, sinopse, ano, generoSelect, classificacao, size, duracao, capa, backdrop, url, idMovie } = this.state;
      let bodyFormData = {
        titulo: titulo,
        capa: capa,
        backdrop: backdrop,
        sinopse: sinopse,
        ano: ano,
        url: url,
        duracao: duracao,
        size: size,
        classificacao: classificacao,
        generos: generoSelect
      }
      /* const config = {
         headers: {
           'Authorization': 'Bearer ' + this.token
         }
       }*/

      api.post('/movie/incluir', bodyFormData)
        .then(result => {
          if (result.status) {
            console.log('fORMULARIO ENVIADO')
            //this.setState({ redirect: true, isLoading: false })
          }
        })
        .catch(error => {
          //this.setState({ toDashboard: true });
          //this.setState({ redirect: true, isLoading: false })
          console.log(error);
        });

    } catch (e) {
      console.log(e)
      this.setState({ isLoading: false })
    }
  };
  render() {

    const { generoSelect, uploadedCapa, uploadedFilmes, uploadeDrop, isLoading, titulo, sinopse, ano, generos, classificacao } = this.state;
    return (
      <div>
        <Header />
        <div id="wrapper" style={{ padding: 100 }}>
          <div id="content-wrapper">
            <div className="container-fluid">

              <div className="card mb-3" style={{ backgroundColor: '#111', borderRadius: 16, borderColor: '#1976D2' }}>
                <div className="card-header" style={{ backgroundColor: '#1430f0', borderStartEndRadius: 16, borderStartStartRadius: 16 }}>
                  <div className="row">
                    <div className="col-sm-2">
                      <i className="fas fa-table"></i>
                      <Typography style={{ fontSize: 20, color: 'white' }}>Cadastro de Filme</Typography>
                    </div>


                  </div>

                </div>
                <div className="submit-form">

                  <form className="col-md-12" onSubmit={this.handleSubmit} style={{ padding: 30 }}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-12">
                          <TextField
                            required
                            id="standard-multiline-flexible"
                            label="Titulo"
                            InputLabelProps={{
                              classes: {
                                root: this.props.classes.cssLabel,
                                //focused: this.props.classes.cssFocused
                              }
                            }}
                            InputProps={{
                              className: this.props.classes.cssLabel
                            }}
                            fullWidth
                            multiline
                            maxRows={1}
                            value={titulo}
                            onChange={this.handleChangeTitulo}

                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-12">
                          <Typography>Gêneros</Typography>
                          {generos && generos.map((item, index) => (
                            <FormControl component="fieldset">

                              <FormGroup aria-label="position" row>

                                <FormControlLabel
                                  value={item.genero}
                                  control={<Checkbox
                                    onChange={(event) => this.handleCheck(event, item._id)}
                                    checked={generoSelect.includes(item._id)}
                                  />}
                                  label={item.genero}
                                  labelPlacement={item.genero}

                                />
                              </FormGroup>
                            </FormControl>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <TextField
                            type="number"
                            required
                            id="standard-multiline-flexible"
                            label="Classificação"

                            InputLabelProps={{
                              classes: {
                                root: this.props.classes.cssLabel,
                                //focused: this.props.classes.cssFocused
                              }
                            }}
                            InputProps={{
                              className: this.props.classes.cssLabel
                            }}
                            fullWidth
                            rowsMax={1}
                            value={classificacao}
                            onChange={this.handleChangeClassificacao}

                          />
                        </div>
                        <div className="col-md-6">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                              views={['year']}
                              label="Ano"
                              value={ano}
                              onChange={(newValue) => {
                                this.setState({ ano: newValue });
                              }}
                              renderInput={(params) => <TextField {...params}
                                helperText={null}
                                error={false}
                                //color="primary"
                                style={{ width: '100%', color: 'white' }}
                                InputLabelProps={{

                                  classes: {
                                    root: this.props.classes.cssLabel,
                                    //focused: this.props.classes.cssFocused
                                  }
                                }}
                                InputProps={{
                                  className: this.props.classes.cssLabel
                                }}
                              />}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row">


                        <TextField
                          required
                          id="standard-multiline-flexible"
                          label="Sinopse"
                          InputLabelProps={{
                            classes: {
                              root: this.props.classes.cssLabel,
                              //focused: this.props.classes.cssFocused
                            }
                          }}
                          InputProps={{
                            className: this.props.classes.cssLabel
                          }}
                          fullWidth
                          multiline
                          rowsMax={5}
                          value={sinopse}
                          onChange={this.handleChangeSinopse}

                        />

                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: 30 }}>
                      <div className="form-row">
                        <div className="col-md-12">

                          <Typography>Capa do Filme</Typography><br />

                          {!!uploadedCapa.length ? (
                            <FileList files={uploadedCapa} name={Types.capa} onDelete={this.handleDelete} />
                          ) :
                            <Upload onUpload={(files) => { this.handleUpload(files, Types.capa) }} accept="image/*" />
                          }

                        </div>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: 30 }}>
                      <div className="form-row">
                        <div className="col-md-12">

                          <Typography>Backdrop do Filme</Typography><br />

                          {!!uploadeDrop.length ? (
                            <FileList files={uploadeDrop} name={Types.backdrop} onDelete={this.handleDelete} />
                          ) :
                            <Upload onUpload={(files) => { this.handleUpload(files, Types.backdrop) }} accept="image/*" />
                          }

                        </div>
                      </div>
                    </div>


                    <div className="form-group" style={{ marginTop: 30 }}>
                      <div className="form-row">
                        <div className="col-md-12">

                          <Typography>Filme</Typography><br />

                          {!!uploadedFilmes.length ? (
                            <FileList files={uploadedFilmes} name={Types.movie} onDelete={this.handleDelete} />
                          ) :
                            <Upload onUpload={(files) => { this.handleUpload(files, Types.movie) }} accept="video/*" />
                          }

                        </div>
                      </div>
                    </div>


                    <div className="form-group">
                      <div className="form-row" style={{ padding: 30 }}>

                        <div className="col-sm-5"></div>
                        <div className="col-sm-7">

                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            // onClick={this.checkduplicate}
                            disabled={isLoading ? true : false}
                            startIcon={<SaveIcon />}
                          >
                            Salvar &nbsp;&nbsp;&nbsp;
                            {isLoading ? (
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                              <span></span>
                            )}
                          </Button>

                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
AddMovie.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddMovie);