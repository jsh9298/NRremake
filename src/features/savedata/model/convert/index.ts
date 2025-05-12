import YAML from 'yaml'
export function saveToObject(data){
    return YAML.parse(data);
}
export function ObjectToSave(data){
    const doc = new YAML.Document();
    doc.contents = data;
}