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
    team: string,
    type: number,
    observations: string
}
export interface IOperativeClients {
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
    social_security: boolean,
    balance: boolean,
    observations: string,
    client_check: boolean,
    client_check_update: Date,
    admin_check: number,
    admin_check_update: Date,
    user_id: number,
    commercial_client_id: number,
    is_mono: boolean,
    verification_code: string,
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