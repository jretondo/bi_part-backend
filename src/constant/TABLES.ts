enum AdminCol {
    id = 'id',
    name = 'name',
    lastname = 'lastname',
    email = 'email',
    user = 'user',
    phone = 'phone'
}

enum AuthAdmCol {
    id = 'id',
    user = 'user',
    pass = 'pass',
    prov = 'prov',
    admin_id = "admin_id"
}

enum UserPermissionCol {
    id = "id",
    user_id = "user_id",
    permission_id = "permission_id",
    client_id = "client_id",
    permission_grade = "permission_grade",
    client_enabled = "client_enabled"
}

enum UserModules {
    id = "id",
    user_id = "user_id",
    module_id = "module_id",
    permission_grade = "permission_grade"
}

enum Modules {
    id = "id",
    module_name = "module_name"
}

enum ClientsPermissions {
    id = "id",
    description = "description"
}

enum Activity {
    id = "id",
    date = "date",
    user_id = "user_id",
    activity_description = "activity_description"
}

enum OperativeClients {
    id = "id",
    document_type = "document_type",
    document_number = "document_number",
    business_name = "business_name",
    fantasie_name = "fantasie_name",
    email = "email",
    iva_condition_id = "iva_condition_id",
    direction = "direction",
    phone = "phone",
    city = "city",
    activity_description = "activity_description",
    team = "team",
    is_legal_person = "is_legal_person",
    social_security = "social_security",
    type = "type",
    observations = "observations",
    commercial_client_id = "commercial_client_id",
    user_id = "user_id",
    client_check = "client_check",
    client_check_update = "client_check_update",
    admin_check = "admin_check",
    admin_check_update = "admin_check_update"
}

enum CommercialClients {
    id = "id",
    document_type = "document_type",
    document_number = "document_number",
    business_name = "business_name",
    fantasie_name = "fantasie_name",
    email = "email",
    iva_condition_id = "iva_condition_id",
    direction = "direction",
    phone = "phone",
    city = "city",
    activity_description = "activity_description",
    is_legal_person = "is_legal_person",
    social_security = "social_security",
    type = "type",
    balance = "balance",
    observations = "observations",
    commercial_client_id = "commercial_client_id"
}

enum IvaConditions {
    id = "id",
    description = "description"
}

enum InvoiceTypes {
    id = "id",
    description = "description",
    letter = "letter"
}

enum IvaTypes {
    id = "id",
    name = "name",
    percentage = "percentage"
}

enum Parameters {
    id = "id",
    parameter = "parameter",
    value = "value"
}

enum AfipCrt {
    id = "id",
    cuit = "cuit",
    crt_file = "crt_file",
    key_file = "key_file",
    business_name = "business_name",
    document_number = "document_number",
    crt_name = "crt_name",
    enabled = "enabled"
}

export enum Tables {
    ADMIN = "admins",
    AUTH_ADMIN = "auth_admin",
    USER_PERMISSIONS = "admin_permissions",
    MODULES = "modules",
    ACTIVITY = "activities",
    COMMERCIAL_CLIENTS = "commercial_clients",
    OPERATIVE_CLIENTS = "operative_clients",
    IVA_CONDITIONS = "iva_conditions",
    INVOICE_TYPES = "invoice_types",
    IVA_TYPES = "iva_types",
    PARAMETERS = "parameters",
    AFIP_CRT = "afip_crt",
    CLIENTS_PERMISSIONS = "clients_permissions",
    USER_MODULES = "user_modules"
}

export const Columns = {
    admin: AdminCol,
    authAdmin: AuthAdmCol,
    userPermissions: UserPermissionCol,
    modules: Modules,
    activity: Activity,
    operativeClients: OperativeClients,
    commercialClients: CommercialClients,
    ivaConditions: IvaConditions,
    invoiceTypes: InvoiceTypes,
    ivaTypes: IvaTypes,
    parameters: Parameters,
    afipCrt: AfipCrt,
    clientsPermissions: ClientsPermissions,
    userModules: UserModules
}