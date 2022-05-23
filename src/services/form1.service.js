import createHttp from './BaseService'

const http = createHttp(true)

export const createRadio   = (data) => http.post ('/radio',data)
export const findByIdRadio = (id)   => http.get  (`/radio/${id}`)
export const findByIdAndUpdateRadio = (id,data) => http.patch(`/radio/${id}`,data)

export const createMixed  = (data) => http.post ('/mixed',data)
export const findAllMixed = ()     => http.get  ('/mixed' )
export const findByIdMixed = (id)   => http.get  (`/mixed/${id}`)
export const findByIdAndUpdateMixed = (id,data) => http.patch(`/mixed/${id}`,data)
