const configurePagination = function () {
    if (this.pagination) {
        this.dOptions.pageModel = {
            type: this.paginationSource,
            format: '#,###',
            rPP: this.paginationRpp,
            strRpp: "{0}"
        };
    }
};

const configureSort = function () {
    if (this.sortable) {
        this.dOptions.sortModel = {
            type: this.sortType,
            single: this.sortMultiple,
            sorter: this.columnsSorter,
            space: true,
            multiKey: null
        };
    }
}

const configureFilterToolbar = function () {
    // Permite agregar a la tabla en la sección del Toolbar
    // un campo de texto que filtre todas las columnas de la tabla
    if (this.filter && this.filterLocation == 'toolbar') {
        this.dOptions.filterModel = {
            mode: 'OR',
            type: this.filterType
        };

        let listenerOption = {
            type: 'textbox',
            label: 'Buscar: ',
            attr: 'placeholder="Ingresa algun texto....."',
            cls: "filterValue",
            listener: {}
        };

        listenerOption.listener[this.listenerFilter] = this.filterHandler;


        this.dOptions.toolbar.items.push(listenerOption);

        this.dOptions.columnTemplate = {render: this.filterRender};

    }
};

const configureContextMenu = function () {
    // Configuración del Context Menu tenga al menos un item
    if (this.contextMenu !== null) {
        this.dOptions.contextMenu = {
            on: true,
            cellItems: this.contextMenu
        }
    }
};

const configureFilter = function () {
    if (this.filter) {
        this.dOptions.filterModel = {
            on: this.filter,
            header: this.filterLocation == 'header' && this.filter ? true : false,
            mode: this.filterMode,
            type: this.filterType,
            menuIcon: this.filterIcon
        };
    }
};

const filterHandler = function () {
    var $toolbar = this.getGrid().toolbar(),
        $value = $toolbar.find(".filterValue"),
        value = $value.val(),
        columnas = this.getGrid().getColModel(),
        filterRules = [];

    columnas.forEach(column =>{
        // Opcion 1
        // Permite excluir del filtro las columnas que son configuradas en la propiedad columns-filter-disable
        // if ((this.columnsFilterDisable !== null && this.columnsFilterDisable.indexOf(column.dataIndx) == -1) || this.columnsFilterDisable === null) {
        //     filterRules.push({dataIndx: column.dataIndx, condition: 'contain', value: value});
        // }

        // Opcion 2
        // Permite excluir del filtro las columnas que son configuradas en filter false en el array de columnas
        if (column.filter !== false) {
            filterRules.push({dataIndx: column.dataIndx, condition: 'contain', value: value});
        }

    });

    this.getGrid().filter({
        oper: 'replace',
        rules: filterRules
    });
};

const filterRender = function (ui) {
    let val = ui.cellData,
        filter = ui.column.filter,
        crules = (filter || {}).crules;

    if (filter && filter.on && crules && crules[0].value) {
        var condition = crules[0].condition,
            valUpper = val.toUpperCase(),
            txt = crules[0].value,
            txt = (txt == null) ? "" : txt.toString(),
            txtUpper = txt.toUpperCase(),
            indx = -1;
        if (condition == "end") {
            indx = valUpper.lastIndexOf(txtUpper);
            //if not at the end
            if (indx + txtUpper.length != valUpper.length) {
                indx = -1;
            }
        } else if (condition == "contain") {
            indx = valUpper.indexOf(txtUpper);
        } else if (condition == "begin") {
            indx = valUpper.indexOf(txtUpper);
            //if not at the beginning.
            if (indx > 0) {
                indx = -1;
            }
        }
        if (indx >= 0) {
            var txt1 = val.substring(0, indx);
            var txt2 = val.substring(indx, indx + txt.length);
            var txt3 = val.substring(indx + txt.length);
            return txt1 + "<span style='background:yellow;color:#333;'>" + txt2 + "</span>" + txt3;
        } else {
            return val;
        }
    } else {
        return val;
    }
};

const configureHistory = function(){

    if(this.history)
    {
        this.dOptions.history = function (evt, ui) {
            var $tb = this.toolbar(),
                $undo = $tb.find("button.undo"),
                $redo = $tb.find("button.redo");

            if (ui.canUndo != null) {
                $undo.button("option", { disabled: !ui.canUndo });
            }
            if (ui.canRedo != null) {
                $redo.button("option", "disabled", !ui.canRedo);
            }
            $undo.button("option", { label: 'Deshacer (' + ui.num_undo + ')' });
            $redo.button("option", { label: 'Rehacer (' + ui.num_redo + ')' });
        };

        this.dOptions.toolbar.items.push({
            type: 'button',
            cls: 'undo',
            icon: 'ui-icon-arrowreturn-1-s',
            label: 'Deshacer',
            options: { disabled: true },
            listener: function () {
                this.history({ method: 'undo' });
            }
        });
        this.dOptions.toolbar.items.push({
            type: 'button',
            cls: 'redo',
            icon: 'ui-icon-arrowrefresh-1-s',
            label: 'Rehacer',
            options: { disabled: true },
            listener: function () {
                this.history({ method: 'redo' });
            }
        });
    }
}

const getData = function () {
    return this.pqGrid.option('dataModel.data');
};

const getGrid = function () {
    return this.pqGrid;
}

const updateRemoteData = function () {
    this.pqGrid.refreshDataAndView();
};

const deleteRow = function (idx) {
    this.pqGrid.deleteRow({rowIndx: idx});
};

export default {
    filterRender,
    filterHandler,
    configurePagination,
    configureSort,
    configureFilter,
    configureFilterToolbar,
    configureContextMenu,
    configureHistory,
    getData,
    getGrid,
    updateRemoteData,
    deleteRow,
};

export {
    filterRender,
    filterHandler,
    configurePagination,
    configureSort,
    configureFilter,
    configureFilterToolbar,
    configureContextMenu,
    configureHistory,
    getData,
    getGrid,
    updateRemoteData,
    deleteRow,
};

