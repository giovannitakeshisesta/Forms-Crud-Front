import createHttp from './BaseService'

const http = createHttp(true)

export const createMixed  = (data) => http.post ('/mixed',data)
export const findAllMixed = ()     => http.get  ('/mixed' )
export const findByIdMixed = (id)   => http.get  (`/mixed/${id}`)
export const findByIdAndUpdateMixed = (id,data) => http.patch(`/mixed/${id}`,data)
export const findByIdAndDelete = (id)   => http.delete(`/mixed/${id}`)



export const createImage= (data) => http.post ('/imginput',data)
export const findAllImage = ()   => http.get  ('/imginput' )
export const findByIdImage= (id) => http.get  (`/imginput/${id}`)
export const findByIdAndUpdateImage= (id,data) => http.patch(`/imginput/${id}`,data)
export const findByIdAndDeleteImage = (id)   => http.delete(`/imginput/${id}`)
