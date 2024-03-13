import sass from "./DocumentInfo.module.scss";
import { FC } from "react";
import { DocumentType } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch, removeDocument } from "../../redux";
import { useReduxState } from "../../hooks";

type DocumentInfoType = {
  info: DocumentType,
}

export const DocumentInfo: FC<DocumentInfoType> = ({ info }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents } = useReduxState();

  return (
    <div className={sass.wrapper}>
      <button className={sass.delete} onClick={() => dispatch(removeDocument(documents.currentDocument))}>Delete file</button>
      <ul className={sass.list}>
        <li className={sass.item}>
          <b className={sass.itemTitle}>Common Name:</b>
          <p>
            {info.commonName}
          </p>
        </li>
        <li className={sass.item}>
          <b className={sass.itemTitle}>Issuer CN:</b>
          <p>
            {info.issuerName}
          </p>
        </li>
        <li className={sass.item}>
          <b className={sass.itemTitle}>Valid From:</b>
          <p>
            {info.validFrom}
          </p>
        </li>
        <li className={sass.item}>
          <b className={sass.itemTitle}>Valid To:</b>
          <p>
            {info.validTo}
          </p>
        </li>
      </ul>
    </div>
  )
};
