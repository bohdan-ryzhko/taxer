import { useSelector } from "react-redux";
import { AppState } from "../redux";
import { selectDocuments } from "../redux/selectors";

export const useReduxState = (): AppState => ({
  documents: useSelector(selectDocuments),
});
