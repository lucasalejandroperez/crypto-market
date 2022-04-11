export function isEmpty(object:any) {
    for (const property in object) {
      return false;
    }
    return true;
}