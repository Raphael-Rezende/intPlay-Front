import React, { Component } from "react";
//import MovieDataService from "../../services/movie.service";
import './styles.css';

import api from "../../services/http-common";

import Upload from "../Upload/index"

import FileList from "../FileList/index"

import { uniqueId } from 'lodash';

import filesize from 'filesize';


export default class AddTutorial extends Component {

  state = {
    uploadedFiles: [],
    uploadedFilmes: [],
    uploadeDrop: []
  };

  async componentDidMount() {
    const response = await api.get("movies");

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      })),
      uploadedFilmes: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      })),
      uploadeDrop: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    });
  }

  handleUpload = (files, name) => {

    console.log(name)

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
      case 'filmes': {

        this.setState({
          uploadedFilmes: this.state.uploadedFilmes.concat(uploadedFiles)
        });
        break;
      }
      case 'capa': {
        this.setState({
          uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });
        break;
      }
      case 'backdrop': {

        this.setState({
          uploadeDrop: this.state.uploadeDrop.concat(uploadedFiles)
        });
        break;
      }
    }


    uploadedFiles.forEach(file => this.processUpload(file, name));
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = (uploadedFile, name) => {
    const data = new FormData();

    data.append(name, uploadedFile.file, uploadedFile.name);

    api
      .post("movies", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  handleDelete = async id => {
    await api.delete(`movies/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }
  render() {

    const { uploadedFiles, uploadedFilmes, uploadeDrop } = this.state;

    return (
      <div className="submit-form">

        <h1>Cadastrar filme</h1><br /><br />

        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={this.state.nome}
              onChange={this.onChangeNome}
              name="nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sinopse">Sinopse</label>
            <textarea
              type="text"
              className="form-control"
              id="sinopse"
              required
              value={this.state.sinopse}
              onChange={this.onChangeSinopse}
              name="sinopse"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              type="text"
              className="form-control"
              id="descricao"
              required
              value={this.state.descricao}
              onChange={this.onChangeDescricao}
              name="descricao"
            />
          </div>

          <div className="form-group">
            <label htmlFor="path">Filme/Série</label><br />
            <Upload onUpload={(files) => { this.handleUpload(files, 'filmes') }} accept="video/*" />
            {!!uploadedFilmes.length && (

              <FileList files={uploadedFilmes} onDelete={this.handleDelete}/>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="capaIMG">Capa do Filme</label><br />
            <Upload onUpload={(files) => { this.handleUpload(files, 'capa') }} accept="image/*" />
            {!!uploadedFiles.length && (

              <FileList files={uploadedFiles}  onDelete={this.handleDelete}/>
            )}


          </div>

          <div className="form-group">
            <label htmlFor="backdrop">Backdrop</label><br />
            <Upload onUpload={(files) => { this.handleUpload(files, 'backdrop') }} accept="image/*" />
            {!!uploadeDrop.length && (

              <FileList files={uploadeDrop} onDelete={this.handleDelete}/>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria ( Seriado ou Filme )</label>
            <input
              type="text"
              className="form-control"
              id="categoria"
              required
              value={this.state.categoria}
              onChange={this.onChangeCategoria}
              name="categoria"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genero">Genero</label>
            <input
              type="text"
              className="form-control"
              id="genero"
              required
              value={this.state.genero}
              onChange={this.onChangeGenero}
              name="genero"
            />
          </div>

          <button onClick={this.saveTutorial} className="btn btn-success" value="upload">
            Submit
            </button>
        </div>

      </div>
    );
  }
}
