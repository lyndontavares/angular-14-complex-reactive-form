/**
 *  IDataService
 *  Mantém o estado do form do crud
 *
 *  @acao 'add' | 'edit' | 'view' | 'filter'
 *  @record regitro atual
 *  @lastRecord últimos registros
 *  @presentation 'route' | 'dialog'
 *
 */
export interface IDataService {
    mode?: 'add' | 'edit' | 'view' | 'filter'
    record?: any
    lastRecords?: any[]
    presentation?: 'route' | 'dialog' | any
}
