import createHttp from './BaseService'

const http = createHttp(true)

export const create   = (data) => http.post ('/form1',data)
export const findAll  = ()     => http.get  ('/form1' )
export const findById = (id)   => http.get  (`/form1/${id}`)
export const findByIdAndUpdate = (id,data) => http.patch(`/form1/${id}`,data)