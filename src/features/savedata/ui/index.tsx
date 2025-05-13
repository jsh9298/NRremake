
import { checkbuket, createUserFile, downloadData } from "../model";

export default function Fortest() {
     return (
      <form>
            <button formAction={createUserFile}>copy</button>
            <button formAction={downloadData}>down</button>
            <button formAction={checkbuket}>buketFucking</button>
      </form>
     )
}