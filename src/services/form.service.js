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


export const createFinalForm= (data) => http.post ('/finalform',data)
export const findAllFinalForm = ()   => http.get  ('/finalform' )
export const findByIdFinalForm= (id) => http.get  (`/finalform/${id}`)
export const findByIdAndUpdateFinalForm= (id,data) => http.patch(`/finalform/${id}`,data)
export const findByIdAndDeleteFinalForm = (id)   => http.delete(`/finalform/${id}`)