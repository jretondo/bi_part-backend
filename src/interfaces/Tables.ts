export interface IAuth {
    id?: number,
    user: string,
    pass?: string,
    prov: number,
    admin_id: number
}
export interface IUser {
    id?: number,
    name: string,
    lastname: string
    email: string,
    user: string,
    phone: string,
    admin?: boolean,
    userName?: string
}
export interface IUserPermission {
    id?: number,
    user_id: number,
    permission_id: number,
    client_id: number,
    permission_grade: number, //0 ==> read, 1 ==> read and edit, 2 ==> read, edit and delete
    client_enabled: boolean
}

export interface IUserModules {
    id?: number,
    user_id: number,
    module_id: number,
    permission_grade: number //0 ==> read, 1 ==> read and edit, 2 ==> read, edit and delete
}

export interface IModules {
    id?: number,
    module_name: string
}

export interface IClientsPermissions {
    id?: number,
    description: string
}

export interface IActivity {
    id?: number,
    date?: Date,
    user_id: number,
    activity_description: string
}

export interface ICommercialClients {
    id?: number,
    document_type: number,
    document_number: string,
    business_name: string,
    fantasie_name: string,
    email: string,
    iva_condition_id: number,
    direction: string,
    phone: string,
    city: string,
    activity_description: number,
    is_legal_person: boolean,
    observations: string
}
export interface IOperativeClients {
    commercial_client_id: number, //user who is the operative responsible
    id?: number,
    document_type: number,
    document_number: string,
    business_name: string,
    fantasie_name: string,
    email: string,
    iva_condition_id: number,
    direction: string,
    phone: string,
    city: string,

    is_legal_person: boolean, //true ==> legal person, false ==> physical person
    born_date: Date,
    client_type_id: number,

    activity_description: string,  
  
    observations: string, 

    product_pyme_id: number;
    team_id: number,
    division_id: number;

    balance: boolean,
    balance_close: number, // --> month number
    cupon: boolean  
    invoice: boolean,
    system: boolean,
    sociality: boolean,
    team_balance_id: number,
    physical_person: boolean, // --> Anual
    risk: boolean,
    team_risk_id: number,
}

export interface IIvaConditions {
    id?: number,
    description: string
}

export interface IInvoiceTypes {
    id?: number,
    description: string,
    letter: string
}

export interface IIvaTypes {
    id?: number,
    name: string,
    percentage: number
}

export interface IParameters {
    id?: number,
    parameter: string,
    value: string
}

export interface IAfipCrt {
    id?: number,
    document_number: string,
    business_name: string,
    crt_file?: string,
    key_file?: string,
    enabled?: boolean,
    crt_name: string
}

export interface ITeam {
    id?: number,
    name: string,
    description: string
}

export interface IDivision {
    id?: number,
    name: string,
    description: string
}

export interface IGrossIncome {
    id?: number,
    name: string,
    description: string
}

export interface IServiceType {
    id?: number,
    name: string,
    description: string
}

export interface IMonotributoTypes {
    id?: number,
    name: string,
    description: string
}

export interface IVatRanking {
    id?: number,
    digit: number,
    rank: number
}

export interface ISocialSecurity {
    id?: number,
    digit: number,
    rank: number
}

export interface IService {
    id?: number,
    name: string,
    description: string
}

export interface IGrossIncome {
    id?: number,
    name: string,
    description: string
}

export interface IClientType {
    id?: number,
    name: string,
    description: string
}

export interface IProductPyme{
    id?: number,
    name: string,
    gross_income_id?: number,
    monotributo_type_id?: number,   
    service_type_id?: number,
    social_security?: number,
    domestic_service?: number,
    operative_taxes_user_id: number,
    operative_onboard_user_id: number,
    operative_domestic_user_id: number,
}