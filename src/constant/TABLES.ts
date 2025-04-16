enum AdminCol {
  id = 'id',
  name = 'name',
  lastname = 'lastname',
  email = 'email',
  user = 'user',
  phone = 'phone',
}

enum AuthAdmCol {
  id = 'id',
  user = 'user',
  pass = 'pass',
  prov = 'prov',
  admin_id = 'admin_id',
}

enum UserPermissionCol {
  id = 'id',
  user_id = 'user_id',
  permission_id = 'permission_id',
  client_id = 'client_id',
  permission_grade = 'permission_grade',
  client_enabled = 'client_enabled',
}

enum UserModules {
  id = 'id',
  user_id = 'user_id',
  module_id = 'module_id',
  permission_grade = 'permission_grade',
}

enum Modules {
  id = 'id',
  module_name = 'module_name',
}

enum ClientsPermissions {
  id = 'id',
  description = 'description',
}

enum Activity {
  id = 'id',
  date = 'date',
  user_id = 'user_id',
  activity_description = 'activity_description',
}

enum OperativeClients {
  commercial_client_id = 'commercial_client_id',
  id = 'id',
  document_type = 'document_type',
  document_number = 'document_number',
  business_name = 'business_name',
  fantasie_name = 'fantasie_name',
  email = 'email',
  iva_condition_id = 'iva_condition_id',
  direction = 'direction',
  phone = 'phone',
  city = 'city',
  is_legal_person = 'is_legal_person',
  born_date = 'born_date',
  client_type_id = 'client_type_id',
  activity_description = 'activity_description',
  observations = 'observations',
  product_pyme_id = 'product_pyme_id',
  team_id = 'team_id',
  division_id = 'division_id',
  balance = 'balance',
  balance_close = 'balance_close',
  cupon = 'cupon',
  invoice = 'invoice',
  system = 'system',
  sociality = 'sociality',
  team_balance_id = 'team_balance_id',
  physical_person = 'physical_person',
  risk = 'risk',
  team_risk_id = 'team_risk_id',
}

enum CommercialClients {
  id = 'id',
  document_type = 'document_type',
  document_number = 'document_number',
  business_name = 'business_name',
  fantasie_name = 'fantasie_name',
  email = 'email',
  iva_condition_id = 'iva_condition_id',
  direction = 'direction',
  phone = 'phone',
  city = 'city',
  activity_description = 'activity_description',
  is_legal_person = 'is_legal_person',
  observations = 'observations',
}

enum IvaConditions {
  id = 'id',
  description = 'description',
}

enum InvoiceTypes {
  id = 'id',
  description = 'description',
  letter = 'letter',
}

enum IvaTypes {
  id = 'id',
  name = 'name',
  percentage = 'percentage',
}

enum Parameters {
  id = 'id',
  parameter = 'parameter',
  value = 'value',
}

enum AfipCrt {
  id = 'id',
  cuit = 'cuit',
  crt_file = 'crt_file',
  key_file = 'key_file',
  business_name = 'business_name',
  document_number = 'document_number',
  crt_name = 'crt_name',
  enabled = 'enabled',
}

enum Teams {
  id = 'id',
  name = 'name',
  description = 'description',
}

enum MonotributoTypes {
  id = 'id',
  name = 'name',
  description = 'description',
}

enum ClientTypes {
  id = 'id',
  name = 'name',
  description = 'description',
}

enum GrossIncome {
  id = 'id',
  name = 'name',
  percentage = 'percentage',
}

enum VatRanking {
  id = 'id',
  digit = 'digit',
  rank = 'rank',
}

enum ProductPyme {
  id = 'id',
  name = 'name',
  gross_income_id = 'gross_income_id',
  monotributo_type_id = 'monotributo_type_id',
  social_security = 'social_security',
  domestic_service = 'domestic_service',
  operative_taxes_user_id = 'operative_taxes_user_id',
  operative_domestic_user_id = 'operative_domestic_user_id',
  operative_onboard_user_id = 'operative_onboard_user_id',
}

export enum Tables {
  ADMIN = 'admins',
  AUTH_ADMIN = 'auth_admin',
  USER_PERMISSIONS = 'admin_permissions',
  MODULES = 'modules',
  ACTIVITY = 'activities',
  COMMERCIAL_CLIENTS = 'commercial_clients',
  OPERATIVE_CLIENTS = 'operative_clients',
  IVA_CONDITIONS = 'iva_conditions',
  INVOICE_TYPES = 'invoice_types',
  IVA_TYPES = 'iva_types',
  PARAMETERS = 'parameters',
  AFIP_CRT = 'afip_crt',
  CLIENTS_PERMISSIONS = 'clients_permissions',
  USER_MODULES = 'user_modules',
  TEAMS = 'teams',
  DIVISIONS = 'divisions',
  CLIENT_TYPES = 'client_types',
  GROSS_INCOME = 'gross_income',
  MONOTRIBUTO_TYPES = 'monotributo_types',
  VAT_RANKING = 'vat_ranking',
  SOCIAL_SECURITY = 'social_security',
  PRODUCT_PYME = 'product_pymes',
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
  userModules: UserModules,
  teams: Teams,
  clientTypes: ClientTypes,
  grossIncome: GrossIncome,
  monotributoTypes: MonotributoTypes,
  vatRanking: VatRanking,
  productPyme: ProductPyme,
};
