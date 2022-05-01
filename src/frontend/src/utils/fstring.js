export const formatPrincipal = (principal) => {
   return principal.substring(0, 10)
}

export const formatDatetime = (time) => {
   return time.toDateString()
}

export const formatDate = (time) => {
   return `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
}