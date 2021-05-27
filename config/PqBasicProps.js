export default {
    id: {
        type: String,
        default: 'gridpq'
    },
    extras: {
        type: Object,
        default: null
    },
    editable: {
        type: Boolean,
        default: false
    },
    collapsible: {
        type: Boolean,
        default: false
    },
    toggle: {
        type: Boolean,
        default: false
    },
    sourceLocation: {
        type: String,
        default: 'remote'
    },
    urlSource: {
        type: String,
    },
    dataModel: {
        type: Array,
        default: []
    },
    groupColumns: {
        type: Boolean,
        default: false
    },
    columns: {
        type: Array,
        required: true
    },
    postData: {
        type: Object,
        default: null
    },
    postDataReactive: {
        type: Boolean,
        default: false
    },
    heightTable: {
        type: String,
        default: "360"
    },
    width: {
        type: String,
        default: ''
    },
    reactive: {
        type: Boolean,
        default: false
    },
    menuIcon: {
        type: Boolean,
        default: false
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    showToolbar: {
        type: Boolean,
        default: false
    },
    showTop: {
        type: Boolean,
        default: false
    },
    showBottom: {
        type: Boolean,
        default: false
    },
    draggable: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: false,
        default: 'Basic table'
    },
    scrollModel: {
        type: Boolean,
        default: false
    },
    sortable: {
        type: Boolean,
        default: true
    },
    columnsSorter: {
        type: Array,
    },
    sortMultiple: {
        type: Boolean,
        default: true
    },
    filterLocation: {
        type: String,
        default: 'header'
    },
    filterMode: {
        type: String,
        default: 'AND',
    },
    filterIcon: {
        type: Boolean,
        default: false
    },
    resizable: {
        type: Boolean,
        default: false
    },
    rowBorders: {
        type: Boolean,
        default: true
    },
    columnBorders: {
        type: Boolean,
        default: true
    },
    stripedRows: {
        type: Boolean,
        default: true
    },
    initValue: {
        type: Object,
        default: null
    },
    selectionModel: {
        type: String,
        default: 'cell'
    },
    freezeCols: {
        type: Number,
        default: 0
    },
    freezeRows: {
        type: Number,
        default: 0
    },
    numberCells: {
        type: Boolean,
        default: false
    },
    paginationRpp: {
        type: Number,
        default: 20
    },
    animate: {
        type: Boolean,
        default: true
    },
    export: {
        type: Boolean,
        default: false
    },
    contextMenu: {
        type: Array,
        default: null
    },
    formulas: {
        type: Array,
        default: null
    },
    history: {
        type: Boolean,
        default: false
    },
    // Propiedad que permite excluir alguna columna del filtro "general"
    // Esto solo es aplicable cuando se configura un filtro general en el Toolbar
    // Debe estar habilitado la propiedad filter y la propiedad filter-location="toolbar"
    columnsFilterDisable: {
        type: Array,
        default: null
    }
};
