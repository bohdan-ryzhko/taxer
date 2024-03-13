import sass from "./File.module.scss";
import { ChangeEvent, DragEvent, FC, useState } from "react";
// @ts-ignore
import ASN1 from '@lapo/asn1js';
import { ParsedInfo } from "../../utils";
import { useReduxState } from "../../hooks";
import { useDispatch } from "react-redux";
import { AppDispatch, addDocument } from "../../redux";
import { DocumentInfo } from "../DocumentInfo";
import { toast } from "react-toastify";

export const File: FC = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const { documents } = useReduxState();

  const dispatch = useDispatch<AppDispatch>();

  const onDragOver = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }

  const onDrop = (event: DragEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();

      const selectedFile = event.dataTransfer!.files[0];

      setIsDragOver(false);

      const fileReader = new FileReader();

      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const asn1data = new Uint8Array(arrayBuffer);
        const result = ASN1.decode(asn1data);

        if (result.typeName() !== 'SEQUENCE') {
          toast.warn('type name is not valid');
          return;
        }

        const tbsCertificate = result.sub[0];
        const parsedInfo = new ParsedInfo(tbsCertificate.toPrettyString());

        dispatch(addDocument(parsedInfo.getResult()));
      };

      fileReader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.log(error);
    }
  }

  const onDragLeave = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    console.log(selectedFile);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const asn1data = new Uint8Array(arrayBuffer);
      const result = ASN1.decode(asn1data);

      if (result.typeName() !== 'SEQUENCE') {
        toast.warn('type name is not valid');
        return;
      }

      const tbsCertificate = result.sub[0];
      console.log(tbsCertificate.toPrettyString());
      const parsedInfo = new ParsedInfo(tbsCertificate.toPrettyString());

      dispatch(addDocument(parsedInfo.getResult()));
    };
    fileReader.readAsArrayBuffer(selectedFile!);
  }

  return (
    <div className={sass.fileContainer}>
      {
        (documents.documents.length === 0) && (
          <p className={sass.documentsEmpty}>Немає жодного файла</p>
        )
      }
      <label className={sass.label}>
        {
          (documents.documents.length > 0) &&
          <DocumentInfo info={documents.documents[documents.currentDocument]} />
        }
        <div className={!isDragOver ? sass.dragText : sass.dragTextActive}>
          <p>Відпустіть файл</p>
        </div>
        <input
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          type="file"
          className={sass.file}
          onClick={(e) => e.preventDefault()}
        />
        <input
          onChange={onChange}
          className={sass.clickedFile}
          type="file"
        />
      </label>
    </div >
  );
};
