import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, onDelete, name }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}{" "}
              {!uploadedFile.url ? (
                <button type="button" onClick={() => onDelete(uploadedFile.id, uploadedFile.url, name)}>
                  Cancelar
                </button>
              ) :
                (
                  <button type="button" onClick={() => onDelete(uploadedFile.id, uploadedFile.url, name)}>
                    Excluir
                  </button>
                )}
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 50, },
                  path: { stroke: "#7159c1" },
                  text: { fontSize: '17px', fill: '#eee', }
                }}
                value={uploadedFile.progress}
                strokeWidth={10}
                text={`${uploadedFile.progress}%`}


              />
            )}

          {uploadedFile.url && (
            <a
              href={process.env.REACT_APP_PUBLIC_URL + uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;