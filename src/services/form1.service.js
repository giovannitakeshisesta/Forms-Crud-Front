import createHttp from './BaseService'

const http = createHttp(true)

export const create   = (data) => http.post ('/form1',data)
export const findAll  = ()     => http.get  ('/form1' )
export const findById = (id)   => http.get  (`/form1/${id}`)
export const findByIdAndUpdate = (id,data) => http.patch(`/form1/${id}`,data)


export const create2   = (data) => http.post ('/form4',data)
export const findAll2  = ()     => http.get  ('/form4' )
export const findById2 = (id)   => http.get  (`/form4/${id}`)
export const findByIdAndUpdate2 = (id,data) => http.patch(`/form4/${id}`,data)


export const createRadio   = (data) => http.post ('/radio',data)
export const findByIdRadio = (id)   => http.get  (`/radio/${id}`)
export const findByIdAndUpdateRadio = (id,data) => http.patch(`/radio/${id}`,data)

export const createMixed  = (data) => http.post ('/mixed',data)
export const findAllMixed = ()     => http.get  ('/mixed' )
export const findByIdMixed = (id)   => http.get  (`/mixed/${id}`)
export const findByIdAndUpdateMixed = (id,data) => http.patch(`/mixed/${id}`,data)
