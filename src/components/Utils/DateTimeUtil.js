//Adicione o formato que deseja retorno no case
// Default dd/MM/yyyy HH:mm
// dd/MM/YYYY
// MM/yyyy
// yyyy
export const getDataStringFormat = (dateString, format) => {

  if (!dateString) return ''
  if (dateString.length === 0) return ''

  const year = dateString.slice(0, 4)
  const month = dateString.slice(5, 7)
  const day = dateString.slice(8, 10)
  const hour = dateString.slice(11, 13)
  const minute = dateString.slice(14, 16)
  const second = dateString.slice(17, 19)
  switch (format) {
    case "yyyy":
      return `${year}`
    case "MM/yyyy":
      return `${month}/${year}`
    case "dd/MM/yyyy":
      return `${day}/${month}/${year}`
    default:
      return `${day}/${month}/${year} ${hour}:${minute}`
  }



}