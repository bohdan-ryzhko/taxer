import sass from "./DocumentsList.module.scss";
import { FC } from "react";
import { DocumentType } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch, setCurrenDocument } from "../../redux";
import { useReduxState } from "../../hooks";

type DocumentsListProps = {
  list: DocumentType[],
}

export const DocumentsList: FC<DocumentsListProps> = ({ list }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents } = useReduxState();

  return (
    <>
      {
        (list.length > 0) &&
        <ul className={sass.list}>
          {
            list.map((document, index) => <li
              key={`index-${index}`}
              className={documents.currentDocument === index ? sass.activeItem : sass.item}
            >
              <button
                className={sass.button}
                onClick={() => dispatch(setCurrenDocument(index))}
              >
                {document.commonName}
              </button>
            </li>)
          }
        </ul>
      }
    </>
  )
};
