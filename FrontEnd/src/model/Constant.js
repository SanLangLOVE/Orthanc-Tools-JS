
const keys = {
    AETS_KEY: 'aets',
    PLUGINS_KEY: 'plugins',
    SYSTEM_KEY: 'system',
    ORTHANC_SETTINGS_KEY: 'orthancSettings',
    ORTHANC_VERBOSITY_KEY: 'orthancVerbosity',
    REDIS_SERVER_KEY: 'redisServer',
    JOBS_KEY: 'jobs',
    PEERS_KEY: 'peers',
    ROLES_KEY: 'roles',
    USERS_KEY: 'users',
    BURNER_KEY: 'burner',
    ROBOTS_KEY: 'robots',
    ENDPOINTS_KEY: 'endpoints',
    EXPORT_TRANSCODING: 'export_transcoding',
    SSH_KEY: 'ssh',
    CERTIFICATES_KEY: 'certificates',
    LABELS_KEY: 'labels',
    OPTIONS_GROUP_NAME_KEY: 'optionsGroupName',
    OPTIONS_ASSOCIED_ROLE_KEY: 'optionsAssociedRole',
    ASSOCIATIONS_KEY: 'associations',
    OPTIONS_KEY: 'options',
    TIME: 'time',
    EXPAND: 'expand',
    EXPORT_OPTION_KEYS : 'exportOptions',
    PROGRESSION_KEYS : 'progression',
    ANONYMIZE_KEYS : 'anonymize',
    LABELS_KEY : 'labels',
    STUDY_KEY : 'studies'
}

const filter = {
    STRING_FILTER: "STRING",
    DATE_FILTER: "DATE",
    NUMBER_FILTER: "NUMBER",
    SELECT_FILTER : "SELECT",
    MULTI_SELECT_FILTER : "MULTISELECT"

}

const send_type = {
    LABEL: "label",
    ANON: "anon",
    DELETE: "delete",
    EXPORT: "export"
}

export { keys, filter, send_type }