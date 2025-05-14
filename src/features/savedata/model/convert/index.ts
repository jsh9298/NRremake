import YAML from "yaml";
export function saveToObject(data: string) {
  const result = {
    content: YAML.parse(data),
  };
  return result;
}
// export function ObjectToSave(data) {
//   const doc = new YAML.Document();
//   doc.contents = data;

//   return doc;
// }
