export function getUfs() {
  return fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
}
