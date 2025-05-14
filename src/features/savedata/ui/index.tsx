
import {createUserFile, deleteUserFile, downloadData, updateUserFile} from "../model";

export default function Fortest() {
     return (
      <form>
            <button formAction={createUserFile}>copy</button>
            <button formAction={downloadData}>down</button>
            <button formAction={deleteUserFile}>del</button>
            <button formAction={updateUserFile}>save</button>
      </form>
     )
}